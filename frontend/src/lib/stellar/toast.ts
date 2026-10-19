import { toast } from 'sonner';
import type { contract } from '@stellar/stellar-sdk';
import {
  type ContractErrorInfo,
  LYRICSFLIP_ERRORS,
  parseContractError,
} from './errors';
import { reportError } from '@/lib/error-reporting';

const PUBLIC_PASSPHRASE = 'Public Global Stellar Network ; September 2015';

const explorerTxUrl = (hash: string, networkPassphrase: string) =>
  `https://stellar.expert/explorer/${networkPassphrase === PUBLIC_PASSPHRASE ? 'public' : 'testnet'}/tx/${hash}`;

/**
 * Builds, signs and submits a mutating contract call, reporting progress as a
 * single toast: "Waiting for signature…" → "Submitting…" → "Confirmed" (with a
 * stellar.expert link) or "Failed: <friendly message>".
 */
export interface TxResult<T> {
  result: T;
  /**
   * Ledger close time (unix seconds) of the ledger the transaction landed in,
   * i.e. the instant the network executed the call. `null` when the RPC
   * response did not include it.
   */
  closedAtSeconds: number | null;
  txHash?: string;
}

/**
 * Same as {@link withTxToast}, but also reports when the transaction was
 * included in a ledger. The contract's card/answer windows are measured in
 * ledger time, so callers that need to agree with it (e.g. the 15 s answer
 * window) must anchor on `closedAtSeconds` rather than the local clock.
 */
export async function withTxToastResult<T>(
  build: () => Promise<contract.AssembledTransaction<T>>,
  networkPassphrase: string,
  errors: Record<number, ContractErrorInfo> = LYRICSFLIP_ERRORS,
): Promise<TxResult<T>> {
  const id = toast.loading('Waiting for signature…');
  try {
    const assembled = await build();
    await assembled.sign();
    toast.loading('Submitting…', { id });
    const sent = await assembled.send();
    const hash = sent.sendTransactionResponse?.hash;
    toast.success('Confirmed', {
      id,
      action: hash
        ? {
            label: 'View',
            onClick: () =>
              window.open(explorerTxUrl(hash, networkPassphrase), '_blank'),
          }
        : undefined,
    });
    // `createdAt` only exists on the success variant of the response union.
    const txResponse = sent.getTransactionResponse;
    const closedAtSeconds =
      txResponse && 'createdAt' in txResponse ? txResponse.createdAt : null;
    return {
      result: sent.result,
      closedAtSeconds,
      txHash: hash,
    };
  } catch (err) {
    const contractError = parseContractError(err, errors);
    toast.error(`Failed: ${contractError.message}`, { id });
    reportError({
      contractError: contractError.name,
      network:
        networkPassphrase === PUBLIC_PASSPHRASE ? 'public' : 'testnet',
      route:
        typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
    throw err;
  }
}

export async function withTxToast<T>(
  build: () => Promise<contract.AssembledTransaction<T>>,
  networkPassphrase: string,
  errors: Record<number, ContractErrorInfo> = LYRICSFLIP_ERRORS,
): Promise<T> {
  const { result } = await withTxToastResult(build, networkPassphrase, errors);
  return result;
}
