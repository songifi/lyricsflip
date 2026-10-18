import { env } from '@/env';
import testnetDeployment from '../../../../deployments/testnet.json';

export interface StellarConfig {
  rpcUrl: string;
  networkPassphrase: string;
  lyricsflipContractId: string;
  lyricsflipNftContractId: string;
}

export const createConfig = (): StellarConfig => ({
  rpcUrl: env.NEXT_PUBLIC_STELLAR_RPC_URL,
  networkPassphrase: env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE,
  lyricsflipContractId:
    env.NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID || testnetDeployment.lyricsflip || '',
  lyricsflipNftContractId:
    env.NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID || testnetDeployment.lyricsflipNft || '',
});
