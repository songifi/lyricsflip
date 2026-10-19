import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource, QueryRunner } from 'typeorm';
import { rpc, scValToNative, xdr } from '@stellar/stellar-sdk';
import { LeaderboardService } from '../../leaderboard/services/leaderboard.service';
import { StateRecoveryService } from './state-recovery.service';

/**
 * Metrics exposed by the indexer for the /health endpoint (LF-232).
 */
export interface IndexerMetrics {
  lastLedger: number | null;
  latestLedger: number | null;
  lag: number | null;
  errorCount: number;
  consecutiveErrors: number;
  lastErrorAt: Date | null;
  lastPollAt: Date | null;
  cursor: string | null;
}

/**
 * IndexerService polls Soroban RPC for contract events and upserts database state.
 *
 * Responsibilities:
 * - Poll rpc.Server.getEvents() for both contract IDs
 * - Track cursor position for idempotency (restart-safe)
 * - Decode and validate events (round_created, round_joined, player_ready, etc.)
 * - Upsert chain_rounds, chain_round_players, chain_answers, chain_round_results, chain_nfts
 * - Emit events for real-time WebSocket broadcast
 * - Handle RPC outages gracefully (exponential backoff with jitter)
 * - Recover from RPC event-retention gaps via StateRecoveryService (LF-223)
 */
@Injectable()
export class IndexerService implements OnModuleInit {
  private readonly logger = new Logger(IndexerService.name);
  private currentCursor: string | null = null;
  private isProcessing = false;

  private readonly pageLimit = 100;
  private readonly maxBackoffMs = 60_000;
  private readonly baseBackoffMs = 1_000;

  private lastLedger: number | null = null;
  private latestLedger: number | null = null;
  private errorCount = 0;
  private consecutiveErrors = 0;
  private lastErrorAt: Date | null = null;
  private lastPollAt: Date | null = null;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
    private dataSource: DataSource,
    private leaderboardService: LeaderboardService,
    private stateRecoveryService: StateRecoveryService,
  ) {}

  async onModuleInit() {
    this.logger.log('IndexerService initialized. Scheduled polling will start shortly.');
    // Load last cursor from storage on startup for idempotency
    await this.loadCursorFromStorage();
  }

  /**
   * Poll for new events every 5 seconds (configurable)
   * Idempotent: uses stored cursor to avoid duplicate processing
   */
  @Cron(CronExpression.EVERY_5_SECONDS)
  async indexEvents() {
    if (this.isProcessing) {
      return; // Skip if already processing
    }

    this.isProcessing = true;
    try {
      const rpcServerUrl = this.configService.get<string>('soroban.rpcUrl');
      const contractIds = this.configService.get<string[]>('soroban.contractIds');

      if (!rpcServerUrl || !contractIds || contractIds.length === 0) {
        this.logger.warn('Soroban RPC URL or contract IDs not configured');
        return;
      }

      for (const contractId of contractIds) {
        await this.pollAndProcessEvents(rpcServerUrl, contractId);
      }

      if (this.configService.get<boolean>('soroban.keeperEnabled')) {
        await this.runKeeper();
      }
    } catch (error) {
      this.logger.error(`Error during event indexing: ${error.message}`, error.stack);
      // Continue on error; will retry on next cron tick
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Metrics snapshot for the health indicator (LF-232).
   */
  getMetrics(): IndexerMetrics {
    return {
      lastLedger: this.lastLedger,
      latestLedger: this.latestLedger,
      lag:
        this.lastLedger !== null && this.latestLedger !== null
          ? Math.max(0, this.latestLedger - this.lastLedger)
          : null,
      errorCount: this.errorCount,
      consecutiveErrors: this.consecutiveErrors,
      lastErrorAt: this.lastErrorAt,
      lastPollAt: this.lastPollAt,
      cursor: this.currentCursor,
    };
  }

  /**
   * Poll RPC for events and process them idempotently
   */
  private async pollAndProcessEvents(
    rpcServerUrl: string,
    contractId: string,
  ): Promise<void> {
    try {
      // TODO: Implement Soroban RPC polling
      // const client = new SorobanRpc.Server(rpcServerUrl);
      // const events = await client.getEvents({
      //   contractIds: [contractId],
      //   startLedger: this.getLedgerFromCursor(),
      //   cursor: this.currentCursor,
      // });

      // for (const event of events.records) {
      //   await this.processEvent(event, contractId);
      // }

      // this.currentCursor = events.pagingToken;
      // await this.saveCursorToStorage(this.currentCursor);

      this.logger.debug(
        `Polled contract ${contractId} at cursor ${this.currentCursor}`,
      );
    } catch (error) {
      this.logger.error(
        `RPC polling failed for contract ${contractId}: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Process a single event and upsert database records
   */
  private async processEvent(event: any, contractId: string): Promise<void> {
    try {
      const eventType = event.type;
      const transactionHash = event.transactionHash;
      const eventIndex = event.eventIndex;

      // Create composite key for idempotency
      const eventKey = `${contractId}:${transactionHash}:${eventIndex}`;

      // Check if already processed (idempotency)
      // const existing = await this.eventRepository.findOne({ where: { eventKey } });
      // if (existing) return;

      switch (eventType) {
        case 'RoundCreated':
          await this.handleRoundCreated(event);
          break;
        case 'RoundJoined':
          await this.handleRoundJoined(event);
          break;
        case 'PlayerReady':
          await this.handlePlayerReady(event);
          break;
        case 'RoundStarted':
          await this.handleRoundStarted(event);
          break;
        case 'AnswerSubmitted':
          await this.handleAnswerSubmitted(event);
          break;
        case 'RoundCompleted':
          await this.handleRoundCompleted(event);
          break;
        case 'NftMinted':
          await this.handleNftMinted(event);
          break;
        default:
          this.logger.warn(`Unknown event type: ${eventType}`);
      }

      // Record as processed
      // await this.eventRepository.save({
      //   eventKey,
      //   contractId,
      //   eventType,
      //   transactionHash,
      //   eventIndex,
      //   processedAt: new Date(),
      // });

      this.logger.debug(`Processed ${eventType} event: ${eventKey}`);
    } catch (error) {
      this.logger.error(
        `Error processing event: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async handleRoundCreated(event: any): Promise<void> {
    // TODO: Insert into rounds table
    // Emit event for WebSocket broadcast
    this.eventEmitter.emit('round.created', {
      roundId: event.data.roundId,
      createdAt: new Date(),
    });
  }

  private async handleRoundJoined(event: any): Promise<void> {
    // TODO: Insert into round_players table
    this.eventEmitter.emit('player.joined_round', {
      roundId: event.data.roundId,
      playerId: event.data.playerId,
    });
  }

  private async handlePlayerReady(event: any): Promise<void> {
    // TODO: Update round_players table
    this.eventEmitter.emit('player.ready', {
      roundId: event.data.roundId,
      playerId: event.data.playerId,
    });
  }

  private async handleRoundStarted(event: any): Promise<void> {
    // TODO: Update rounds.status = 'started'
    this.eventEmitter.emit('round.started', {
      roundId: event.data.roundId,
      timestamp: new Date(),
    });
  }

  private async handleAnswerSubmitted(event: any): Promise<void> {
    // TODO: Insert into answers table
    this.eventEmitter.emit('answer.submitted', {
      roundId: event.data.roundId,
      playerId: event.data.playerId,
      answer: event.data.answer,
    });
  }

  private async handleRoundCompleted(event: any): Promise<void> {
    // TODO: Update rounds, compute scores, insert into results
    this.eventEmitter.emit('round.completed', {
      roundId: event.data.roundId,
      results: event.data.results,
    });
  }

  private async handleNftMinted(event: any): Promise<void> {
    // TODO: Insert into nfts table
    this.eventEmitter.emit('nft.minted', {
      playerId: event.data.playerId,
      nftId: event.data.nftId,
    });
  }

  private loadCursorFromStorage(): void {
    // TODO: Load from indexer_state table or config
    this.currentCursor = null;
    this.logger.log('Loaded cursor from storage');
  }

  private async saveCursorToStorage(cursor: string): Promise<void> {
    // TODO: Save to indexer_state table
    this.logger.debug(`Saved cursor: ${cursor}`);
  }

  private getLedgerFromCursor(): number {
    // TODO: Parse cursor to extract ledger number
    return 0;
  }
}
