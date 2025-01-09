#[starknet::contract]
mod LyricsFlip {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map, Vec,
        MutableVecTrait
    };

    use starknet::{get_caller_address, get_block_timestamp, ContractAddress};

    use lyricsflip::interfaces::{ILyricsFlip};
    use lyricsflip::types::{Card, Genre, Round};

    #[storage]
    struct Storage {
        cards_per_round: u8,
        cards: Map::<u64, Card>,
        round_count: u64,
        // round_id -> Round
        rounds: Map::<u64, Round>,
        round_owner: Map::<ContractAddress, Round>,
        // round_id -> vec<card_ids>
        round_cards: Map::<u64, Vec<u64>>,
        card_count: u64,
    }

    #[abi(embed_v0)]
    impl LyricsFlipImpl of ILyricsFlip<ContractState> {
        //TODO
        fn create_round(ref self: ContractState, genre: Option<Genre>) -> u64 {
            let caller = get_caller_address();

            // Get random cards
            let cards = self._get_random_cards();

            let round_id = self.round_count.read() + 1;

            let round = Round {
                round_id,
                player: caller,
                wager_amount: 0, // TODO
                start_time: get_block_timestamp(),
                is_started: false,
                end_time: 0, //TODO
            };

            self.rounds.entry(round_id).write(round);
            for card_ids in 0
                ..cards.len() {
                    self.round_cards.entry(round_id).append().write(card_ids.into())
                };

            //TODO emit event

            round_id
        }

        // TODO
        fn start_round(ref self: ContractState, round_id: u64) {}

        //TODO
        fn join_round(ref self: ContractState, round_id: u64) {}

        // TODO
        fn get_round_cards(self: @ContractState, round_id: u64) -> Span<u64> {
            array![1, 2].span()
        }

        fn get_round(self: @ContractState, round_id: u64) -> Round {
            self.rounds.entry(round_id).read()
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        //TODO
        fn _get_random_cards(ref self: ContractState) -> Span<u64> {
            array![1, 2].span()
        }
    }
}
