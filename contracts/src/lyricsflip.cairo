#[starknet::contract]
mod HelloStarknet {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };

    use starknet::{get_caller_address, get_block_timestamp, ContractAddress};

    use lyricsflip::interfaces::{ILyricsFlip};
    use lyricsflip::types::{Card, Genre, Round};

    #[storage]
    struct Storage {
        card_per_round: u8,
        cards: Map::<u64, Card>,
        round_count: u64,
        rounds: Map::<ContractAddress, Round>
    }

    #[abi(embed_v0)]
    impl LyricsFlipImpl of ILyricsFlip<ContractState> {
        //TODO
        fn start_round(ref self: ContractState, genre: Option<Genre>) {
            // Get random cards
            let cards = self._get_random_cards();

            let caller = get_caller_address();

            let round_id = self.round_count.read() + 1;

            let round = Round {
                round_id,
                player: caller,
                wager_amount: 0, // TODO
                start_time: get_block_timestamp(),
                is_active: true,
                end_time: 0, //TODO
            };
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
