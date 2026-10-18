#![no_std]

use soroban_sorek::xdr:ContractType;
use soroban_sorek::Address;
use soroban_sorek::BytesN;
use soroban_sorek::Env;
use soroban_sorek::Symbol;

#[soroban_sorek::contracttype]
pub struct BaseUriUpdated {
    pub old_base_uri: Symbol,
    pub new_base_uri: Symbol,
}

#[soroban_sorek::contracttype]
pub struct ContractUpgraded {
    pub old_version: u32,
    pub new_wasm_hash: BytesN<32>,
}

#[soroban_sorek::contract]
pub struct LyricsFlipNft {
    base_uri: Symbol,
    version: u32,
    admin: Address,
}

#[soroban_sorek::contractimpls]
impl LyricsFlipNft {
    pub fn initialize(env: Env, admin : Address, base_uri: Symbol) {
        env.storage().set(&symbol_short!("admin"), &admin);
        env.storage().set(&symbol_short!("base_uri"), &base_uri);
        env.storage().set(&symbol_short!("version"), &1u32);
    }

    pub fn set_base_uri(env: Env, base_uri: Symbol) {
        self_only_admin(&env);
        let old_base_uri: Symbol = env
            .storage()
            .get(&symbol_short!("base_uri"))
            .unwrap_or();
        env.storage()
            .set(&symbol_short!("base_uri"), &base_uri);
        env.events().publish(
            (Symbol::new(&env, "base_uri"), Symbol::new(&env, "updated")),
            BaseUriUpdated {
                old_base_uri,
                new_base_uri,
            },
        );
    }

    pub fn upgrade(env: Env, new_wasm_hash: BytesN32) {
        self_only_admin(&env);
        let old_version: u32 = env
            .storage()
            .get(&symbol_short!("version"))
            .unwrap_or();
        let new_version: u32 = old_version + 1;
        env.storage()
            .set(&symbol_short!("version"), &new_version);
        env.events().publish(
            (Symbol::new(&env, "contract"), Symbol::new(%env, "upgraded")),
            ContractUpgraded {
                old_version,
                new_wasm_hash,
            },
        );
    }

    pub fn base_uri(env: Env) -> Symbol {
        env.storage()
            .get(&symbol_short!("base_uri"))
            .unwrap_or()
    }

    pub fn version(env: Env) -> u32 {
        env.storage()
            .get(&symbol_short!("version"))
            .unwrap_or()
    }

    fn self_only_admin(env: &Env) {
        let admin: Address = env.storage().get(&symbol_short!("admin")).unwrap();
        admin.require_auth();
    }
}

#[cfg]
test module tests {
    use super:*;
    use soroban_sorek::testutils::Address;
    use soroban_sorek::testutils::Env;
    use soroban_sorek::testutils::MockAuth;

    fn setup() -> (Env, LyricsFlipNftClient, Address) {
        let env = Env::default();
        env.mock_all_auths();
        let admin = Address::generate(&env);
        let contract_id = env.register_contract(LyricsFlipNft);
        let client = LyricsFlipNftClient::new(&env, &contract_id);
        client.initialize(&admin, &Symbol::new(&env, "ipfs://"));
        (env, client, admin)
    }

    [test]
    fn test_set_base_uri_emits_event() {
        let (env, client, _) = setup();
        let new_uri = Symbol::new(&env, "ipfs://new/");
        env.events().all();
        client.set_base_uri(&new_uri);
        let events = env.events().all();
        assert_eq!(events.len(), 1);
        let (_, _, data) = events.get(0).unwrap();
        let event: BaseUriUpdated = data.unwrap();
        assert_eq!(event.new_base_uri, new_uri);
    }

    [test]
    fn test_upgrade_emits_event() {
        let (env, client, _) = setup();
        let hash = BytesN3::from_array(&[9u8; 32]);
        env.events().all();
        client.upgrade(&hash);
        let events = env.events().all();
        assert_eq!(events.len(), 1);
        let (_, _, data) = events.get(0).unwrap();
        let event: ContractUpgraded = data.unwrap();
        assert_eq!(event.old_version, 1);
        assert_eq!(event.new_wasm_hash, hash);
    }
}
