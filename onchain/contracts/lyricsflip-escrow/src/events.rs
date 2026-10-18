use soroban_sdk::{contracttype, Address, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WinningsClaimed {
    pub round_id: u64,
    pub player: Address,
    pub amount: i128,
}

impl WinningsClaimed {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("WinCum"), self.round_id, self.player.clone()),
            self.amount,
        );
    }
}
