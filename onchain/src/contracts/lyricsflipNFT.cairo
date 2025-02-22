use starknet::ContractAddress;

#[starknet::interface]
pub trait ILyricsFlipNFT<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress);
}

#[starknet::contract]
mod LyricsFlipNFT {
    use lyricsflip::interfaces::lyricsflip::{ILyricsFlipDispatcher, ILyricsFlipDispatcherTrait};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use openzeppelin_access::accesscontrol::AccessControlComponent;
    use starknet::storage::StoragePointerReadAccess;
    use starknet::storage::StoragePointerWriteAccess;
    use starknet::{ContractAddress};

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);

    const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");

    // External
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;

    // Internal
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        token_count: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        minter: ContractAddress,
        token_name: ByteArray,
        token_symbol: ByteArray,
        base_uri: ByteArray
    ) {
        // Verify minter is a LyricsFlip contract by using a method defined on interface
        let lyrics_flip = ILyricsFlipDispatcher { contract_address: minter };
        match lyrics_flip.is_admin(selector!("ADMIN_ROLE"), owner) {
            true => (), // Contract exists and responds correctly
            false => (), // Contract exists but owner is not admin, which is fine
        };

        self.erc721.initializer(token_name, token_symbol, base_uri);
        self.ownable.initializer(owner);
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(MINTER_ROLE, minter);
    }

    #[abi(embed_v0)]
    impl ILyricsFlipNFTImpl of super::ILyricsFlipNFT<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress) {
            self.accesscontrol.assert_only_role(MINTER_ROLE);
            let mut token_id = self.token_count.read() + 1;
            assert(!self.erc721.exists(token_id), 'NFT with id already exists');
            self.erc721.mint(recipient, token_id);
            self.token_count.write(token_id);
        }
    }
}
