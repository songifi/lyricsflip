import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { DataSource } from 'typeorm';

/** Calls the Soroban/Stellar RPC `getHealth` JSON-RPC method. */
@Injectable()
export class StellarRpcHealthIndicator extends HealthIndicator {
  constructor(private readonly config: ConfigService) {
    super();
  }

  private resolveRpcUrl(): string | undefined {
    return (
      this.config.get<string>('soroban.rpcUrl') ??
      process.env.SOROBAN_RPC_URL ??
      process.env.STELLAR_RPC_URL
    );
  }

  async isHealthy(key: string, timeoutMs = 3000): Promise<HealthIndicatorResult> {
    const url = this.resolveRpcUrl();

    if (!url) {
      return this.getStatus(key, true, { message: 'RPC URL not configured' });
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getHealth' }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const body = (await res.json()) as { result?: { status?: string } };
      const status = body.result?.status;
      if (!res.ok || status !== 'healthy') {
        throw new Error(`RPC status: ${status ?? res.status}`);
      }
      return this.getStatus(key, true, { status });
    } catch (err) {
      throw new HealthCheckError(
        'Stellar RPC getHealth failed',
        this.getStatus(key, false, { message: (err as Error).message }),
      );
    }
  }

  /**
   * Calls the Soroban/Stellar RPC `getLatestLedger` JSON-RPC method and
   * returns the latest ledger sequence number.
   */
  async getLatestLedger(timeoutMs = 3000): Promise<number> {
    const url = this.resolveRpcUrl();

    if (!url) {
      throw new Error('RPC URL not configured');
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getLatestLedger' }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    const body = (await res.json()) as {
      result?: { sequence?: number };
      error?: { message?: string };
    };

    if (!res.ok || body.error || typeof body.result?.sequence !== 'number') {
      throw new Error(
        `RPC getLatestLedger failed: ${
          body.error?.message ?? `status ${res.status}`
        }`,
      );
    }

    return body.result.sequence;
  }

  /** Terminus indicator that verifies `getLatestLedger` succeeds within the timeout. */
  async isLatestLedgerHealthy(
    key: string,
    timeoutMs = 3000,
  ): Promise<HealthIndicatorResult> {
    try {
      const sequence = await this.getLatestLedger(timeoutMs);
      return this.getStatus(key, true, { latestLedger: sequence });
    } catch (err) {
      throw new HealthCheckError(
        'Stellar RPC getLatestLedger failed',
        this.getStatus(key, false, { message: (err as Error).message }),
      );
    }
  }
}

/**
 * Compares the latest RPC ledger with `indexer_state.last_ledger` and fails
 * when the lag exceeds the configured threshold.
 */
@Injectable()
export class IndexerLagHealthIndicator extends HealthIndicator {
  constructor(
    private readonly config: ConfigService,
    private readonly rpc: StellarRpcHealthIndicator,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super();
  }

  private getThreshold(): number {
    const raw =
      this.config.get<number | string>('indexer.maxLagLedgers') ??
      process.env.INDEXER_MAX_LAG_LEDGERS ??
      100;
    const parsed = typeof raw === 'number' ? raw : parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 100;
  }

  private getRpcTimeout(): number {
    const raw =
      this.config.get<number | string>('soroban.rpcTimeoutMs') ??
      process.env.SOROBAN_RPC_TIMEOUT_MS ??
      3000;
    const parsed = typeof raw === 'number' ? raw : parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const threshold = this.getThreshold();

    try {
      const latestLedger = await this.rpc.getLatestLedger(this.getRpcTimeout());

      const rows = await this.dataSource.query(
        'SELECT last_ledger FROM indexer_state ORDER BY id ASC LIMIT 1',
      );
      const lastLedgerRaw = rows?.[0]?.last_ledger;
      const lastLedger =
        lastLedgerRaw === null || lastLedgerRaw === undefined
          ? null
          : Number(lastLedgerRaw);

      if (lastLedger === null || !Number.isFinite(lastLedger)) {
        throw new Error('indexer_state.last_ledger not available');
      }

      const lag = latestLedger - lastLedger;
      const healthy = lag <= threshold;

      const status = this.getStatus(key, healthy, {
        latestLedger,
        lastLedger,
        lag,
        threshold,
      });

      if (!healthy) {
        throw new HealthCheckError('Indexer lag exceeds threshold', status);
      }

      return status;
    } catch (err) {
      if (err instanceof HealthCheckError) {
        throw err;
      }
      throw new HealthCheckError(
        'Indexer lag check failed',
        this.getStatus(key, false, { message: (err as Error).message }),
      );
    }
  }
}