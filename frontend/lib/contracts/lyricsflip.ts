import { Contract, NativeToScval, SorobanClient } from '@stellar/stellar-sdk-client';
import { LyricsFlipContract } from './bindings/lyricsflip';

export interface Round {
  pot: bigint;
  status: 'Open' | 'Settled';
  winners: string[];
  claimed: string[];
}

export interface Config {
  owner: string;
  token: string;
  treasury: string;
  fee_bps: number;
}

export class LyricsFlipClient {
  private contract: LyricsFlipContract;

  constructor(contractId: string, publicKey?: string) {
    const client = new SorobanClient(
      'TESTNET',
      'https://soroban-testnet.stellar.org',
      {
        contractId,
        publicKey,
        allowHttp: true,
      },
    );
    this.contract = new LyricsFlipContract(client);
  }

  async initialize(params: {
    owner: string;
    token: string;
    treasury: string;
    feeBps: number;
  }): Promise<void> {
    await this.contract.initialize({
      owner: params.owner,
      token: params.token,
      treasury: params.treasury,
      fee_bps: params.feeBps,
    });
  }

  /**
   * Create a round. Note there is no `seed` argument: the contract uses
   * the network PRNG to draw cards, so callers cannot influence the deal.
   */
  async createRound(params: { roundId: bigint; pot: bigint }): Promise<void> {
    await this.contract.create_round({
      round_id: params.roundId,
      pot: params.pot,
    });
  }

  async settleRound(params: { roundId: bigint; winners: string[] }): Promise<void> {
    await this.contract.settle_round({
      round_id: params.roundId,
      winners: params.winners.map((a) => NativeToScval.addressToScval(a)),
    });
  }

  async claimWinnings(params: { caller: string; roundId: bigint }): Promise<bigint> {
    const tx = await this.contract.claim_winnings({
      caller: params.caller,
      round_id: params.roundId,
    });
    return BigInt(tx. result);
  }

  async getRound(roundId: bigint): Promise<Round> {
    const result = await this.contract.get_round({ round_id: roundId });
    return {
      pot: BigInt(result.result.pot),
      status: result.result.status as 'Open' | 'Settled',
      winners: result.result.winners.map((a) => NativeToScval.scvalToAddress(a)),
      claimed: result.result.claimed.map((a) => NativeToScval.scvalToAddress(a)),
    };
  }

  /**
   * Draw card indices for a round. The contract uses the network PRNG;
   * there is no seed parameter.
   */
  async getCardsOfRound(cardsLen: number, amount: number): Promise<number[]> {
    const result = await this.contract.get_cards_of_round({
      cards_len: cardsLen,
      amount,
    });
    return result.result;
  }

  async getCardsOfPlayer(cardsLen: number, amount: number): Promise<number[]> {
    const result = await this.contract.get_cards_of_player({
      cards_len: cardsLen,
      amount,
    });
    return result.result;
  }
}
