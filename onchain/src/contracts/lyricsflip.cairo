#[starknet::contract]
pub mod LyricsFlip {
    use core::hash::{HashStateExTrait, HashStateTrait};
    use core::poseidon::PoseidonTrait;
    use lyricsflip::interfaces::lyricsflip::{ILyricsFlip};
    use lyricsflip::utils::errors::Errors;
    use lyricsflip::utils::types::{Card, Entropy, Genre, Round};
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin_access::accesscontrol::{AccessControlComponent};
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
        Vec, VecTrait,
    };
    use starknet::{ContractAddress, get_block_number, get_block_timestamp, get_caller_address};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;

    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;

    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        round_count: u64,
        cards_count: u64,
        cards_per_round: u8,
        cards: Map<u64, Card>,
        genre_cards: Map<felt252, Vec<u64>>, // genre -> vec<card_ids>
        artist_cards: Map<felt252, Vec<u64>>, // artist -> vec<card_ids>
        year_cards: Map<u64, Vec<u64>>, // year -> vec<card_ids>
        rounds: Map<u64, Round>, // round_id -> Round
        round_players: Map<
            u64, Map<u256, ContractAddress>,
        >, // round_id -> player_index -> player_address
        round_players_count: Map<u64, u256>,
        round_cards: Map<u64, Vec<u64>>, // round_id -> vec<card_ids>
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        RoundCreated: RoundCreated,
        RoundStarted: RoundStarted,
        RoundJoined: RoundJoined,
        SetCardPerRound: SetCardPerRound,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RoundCreated {
        #[key]
        pub round_id: u64,
        #[key]
        pub admin: ContractAddress,
        pub created_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RoundStarted {
        #[key]
        pub round_id: u64,
        #[key]
        pub admin: ContractAddress,
        pub start_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RoundJoined {
        #[key]
        pub round_id: u64,
        #[key]
        pub player: ContractAddress,
        pub joined_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct SetCardPerRound {
        #[key]
        pub old_value: u8,
        pub new_value: u8,
    }

    const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(ADMIN_ROLE, owner);
    }

    #[abi(embed_v0)]
    pub impl LyricsFlipImpl of ILyricsFlip<ContractState> {
        fn get_round(self: @ContractState, round_id: u64) -> Round {
            self.rounds.entry(round_id).read()
        }

        fn get_round_cards(self: @ContractState, round_id: u64) -> Span<u64> {
            let round_card = self.round_cards.entry(round_id);

            let mut round_cards = array![];
            for i in 0..round_card.len() {
                round_cards.append(round_card.at(i).read());
            };
            round_cards.span()
        }

        fn get_round_players(self: @ContractState, round_id: u64) -> Span<ContractAddress> {
            let round_players_count = self.round_players_count.entry(round_id).read();
            let mut round_players = array![];
            let mut idx = 0;
            while (idx < round_players_count) {
                round_players.append(self.round_players.entry(round_id).entry(idx).read());
                idx += 1;
            };
            round_players.span()
        }

        fn get_players_round_count(self: @ContractState, round_id: u64) -> u256 {
            self.round_players_count.entry(round_id).read()
        }

        fn is_round_player(
            self: @ContractState, round_id: u64, player_address: ContractAddress,
        ) -> bool {
            let round_players = self.get_round_players(round_id);
            let mut is_player = false;
            let mut idx = 0;
            while (idx < round_players.len()) {
                if *round_players.at(idx) == player_address {
                    is_player = true;
                    break;
                }
                idx += 1;
            };
            is_player
        }

        fn create_round(ref self: ContractState, genre: Option<Genre>, seed: u64) -> u64 {
            assert(genre.is_some(), Errors::NON_EXISTING_GENRE);

            let caller_address = get_caller_address();
            let cards = self.get_random_cards(seed);

            let round_id = self.round_count.read() + 1;
            let round = Round {
                round_id,
                admin: caller_address,
                genre: genre.unwrap(),
                wager_amount: 0, // TODO
                start_time: 0,
                is_started: false,
                is_completed: false,
                end_time: 0, //TODO
                next_card_index: 0,
            };

            let round_players_count = self.round_players_count.entry(round_id).read();
            self.round_players.entry(round_id).entry(round_players_count).write(caller_address);
            self.round_players_count.entry(round_id).write(round_players_count + 1);
            self.rounds.entry(round_id).write(round);

            for i in 0
                ..cards.len() {
                    self.round_cards.entry(round_id).append().write(*cards.at(i))
                };

            self
                .emit(
                    Event::RoundCreated(
                        RoundCreated {
                            round_id, admin: caller_address, created_time: get_block_timestamp(),
                        },
                    ),
                );

            round_id
        }

        fn start_round(ref self: ContractState, round_id: u64) {
            assert(self.rounds.entry(round_id).round_id.read() != 0, Errors::NON_EXISTING_ROUND);

            let caller_address = get_caller_address();
            let round = self.rounds.entry(round_id);

            assert(round.admin.read() == caller_address, Errors::NOT_ROUND_ADMIN);

            let start_time = get_block_timestamp();
            round.start_time.write(start_time);
            round.is_started.write(true);

            self
                .emit(
                    Event::RoundStarted(
                        RoundStarted {
                            round_id, admin: round.admin.read(), start_time: start_time,
                        },
                    ),
                );
        }

        fn join_round(ref self: ContractState, round_id: u64) {
            let caller_address = get_caller_address();
            assert(self.rounds.entry(round_id).round_id.read() != 0, Errors::NON_EXISTING_ROUND);
            assert(!self.is_round_player(round_id, caller_address), Errors::ROUND_ALREADY_JOINED);

            let round = self.rounds.entry(round_id);

            assert(!round.is_started.read(), Errors::ROUND_ALREADY_STARTED);

            let round_players_count = self.round_players_count.entry(round_id).read();
            self.round_players.entry(round_id).entry(round_players_count).write(caller_address);
            self.round_players_count.entry(round_id).write(round_players_count + 1);

            self
                .emit(
                    Event::RoundJoined(
                        RoundJoined {
                            round_id, player: caller_address, joined_time: get_block_timestamp(),
                        },
                    ),
                );
        }


        fn set_cards_per_round(ref self: ContractState, value: u8) {
            self.accesscontrol.assert_only_role(ADMIN_ROLE);
            assert(value > 0, Errors::INVALID_CARDS_PER_ROUND);

            let old_value = self.cards_per_round.read();
            self.cards_per_round.write(value);

            self
                .emit(
                    Event::SetCardPerRound(
                        SetCardPerRound { old_value: old_value, new_value: value },
                    ),
                );
        }


        fn get_cards_per_round(self: @ContractState) -> u8 {
            self.cards_per_round.read()
        }


        fn add_card(ref self: ContractState, card: Card) {
            self.accesscontrol.assert_only_role(ADMIN_ROLE);
            let card_id = self.cards_count.read() + 1;

            self.artist_cards.entry(card.artist).append().write(card_id);
            self.genre_cards.entry(card.genre.into()).append().write(card_id);
            self.year_cards.entry(card.year).append().write(card_id);

            self.cards.entry(card_id).write(card);
            self.cards_count.write(card_id);
        }

        fn get_card(self: @ContractState, card_id: u64) -> Card {
            self.cards.entry(card_id).read()
        }

        fn get_cards_of_genre(self: @ContractState, genre: Genre, seed: u64) -> Span<Card> {
            let limit = self.genre_cards.entry(genre.into()).len();
            let amount = self.cards_per_round.read();

            //TODO: check limit >= amount
            assert(limit > 0, 'Not enough cards of this genre');

            let random_numbers: Span<u64> = self
                ._get_random_numbers(seed, amount.into(), limit, true);
            let mut genre_cards: Array<Card> = array![];
            for number in random_numbers {
                let card_id = self.genre_cards.entry(genre.into()).at(*number).read();
                let card = self.cards.entry(card_id).read();
                genre_cards.append(card);
            };
            genre_cards.span()
        }
        // // TODO
        // fn next_card(ref self: ContractState, round_id: u64) -> Card {
        //     self._next_round_card()
        // }

        // // TODO
        // fn get_cards_of_genre(self: @ContractState, genre: Genre, amount: u64) -> Span<Card> {}

        //TODO
        fn get_cards_of_artist(self: @ContractState, artist: felt252, seed: u64) -> Span<Card> {
            assert(self.artist_cards.entry(artist.into()).len() > 0, Errors::ARTIST_CARDS_IS_ZERO);
            let mut cards = array![];
            let amount = self.cards_per_round.read();
            let num_of_artists_cards = self.artist_cards.entry(artist).len();
            let numbers = self._get_random_numbers(seed, amount.into(), num_of_artists_cards, true);
            let mut i = 0_u32;
            while (i < numbers.len()) {
                let card_id = self.artist_cards.entry(artist).at(*numbers[i]).read();
                let card = self.cards.read(card_id);
                cards.append(card);
                i += 1;
            };
            cards.span()
        }


        fn set_role(
            ref self: ContractState, recipient: ContractAddress, role: felt252, is_enable: bool
        ) {
            self._set_role(recipient, role, is_enable);
        }
        fn is_admin(self: @ContractState, role: felt252, address: ContractAddress) -> bool {
            self.accesscontrol.has_role(role, address)
        }

        fn get_cards_of_a_year(self: @ContractState, year: u64, seed: u64) -> Span<Card> {
            let year_cards = self.year_cards.entry(year).len();
            assert(year_cards > 0, Errors::EMPTY_YEAR_CARDS);
            let amount = self.cards_per_round.read();
            let mut cards = ArrayTrait::new();
            let random_indices = self._get_random_numbers(seed, amount.into(), year_cards, true);
            for i in random_indices {
                let card_id = self.year_cards.entry(year).at(*i).read();
                let card = self.cards.entry(card_id).read();
                cards.append(card);
            };
            cards.span()
        }
    }

    #[generate_trait]
    pub impl InternalFunctions of InternalFunctionsTrait {
        //TODO
        fn get_random_cards(self: @ContractState, seed: u64) -> Span<u64> {
            let amount: u64 = self.cards_per_round.read().into();
            let limit = self.cards_count.read();
            self._get_random_numbers(seed, amount, limit, false)
        }

        // // TODO
        // fn _next_round_card(ref self: ContractState, round_id: u64) -> Card {
        //     // check round is started and is_completed is false
        // }

        /// Generates unique random numbers within a specified range.
        /// Uses a seed and entropy (block data, timestamp, index) to create randomness,
        /// ensuring uniqueness via a dictionary. Numbers can be offset by 1 if `for_index` is
        /// false.
        ///
        /// # Args:
        /// * `seed` (u64): Seed for randomness.
        /// * `amount` (u64): Number of unique numbers to generate.
        /// * `limit` (u64): Upper limit for the range (exclusive).
        /// * `for_index` (bool): Whether to offset numbers by 1.
        ///
        /// # Returns:
        /// * `Span<u64>`: Span of unique random numbers.
        fn _get_random_numbers(
            self: @ContractState, seed: u64, amount: u64, limit: u64, for_index: bool,
        ) -> Span<u64> {
            // Initialize a dictionary to ensure uniqueness of numbers
            let mut numbers: Felt252Dict<bool> = Default::default();
            let mut unique_numbers: Array<u64> = array![];
            assert(amount <= limit, 'Amount exceeds limit');
            assert(limit > 0, 'Limit must be greater than 0');

            let mut i = 0_u64;
            while unique_numbers.len().into() < amount {
                let entropy = Entropy {
                    seed,
                    block_number: get_block_number(),
                    timestamp: get_block_timestamp(),
                    index: i,
                };
                let rand_felt = PoseidonTrait::new().update_with(entropy).finalize();
                let rand_u256: u256 = rand_felt.into();
                let rand_u256_in_range: u256 = rand_u256 % limit.into();
                let mut rand: u64 = rand_u256_in_range.try_into().unwrap();

                // Ensure uniqueness by checking the dictionary
                if !for_index {
                    rand += 1;
                }

                if !numbers.get(rand.into()) {
                    unique_numbers.append(rand);
                    numbers.insert(rand.into(), true);
                }

                i += 1; // Increment the index for the next iteration
            };
            unique_numbers.span()
        }

        fn _set_role(
            ref self: ContractState, recipient: ContractAddress, role: felt252, is_enable: bool
        ) {
            self.ownable.assert_only_owner();
            self.accesscontrol.assert_only_role(ADMIN_ROLE);
            assert!(role == ADMIN_ROLE, "role not enable");
            if is_enable {
                self.accesscontrol._grant_role(role, recipient);
            } else {
                self.accesscontrol._revoke_role(role, recipient);
            }
        }
    }
}
