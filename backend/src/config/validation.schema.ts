import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  STELLAR_NETWORK: Joi.string()
    .valid('testnet', 'futurenet', 'mainnet')
    .required(),

  // Optional - see configuration.ts for the defaults applied when unset.
  RATE_LIMIT_TTL: Joi.number().optional(),
  RATE_LIMIT_LIMIT: Joi.number().optional(),
  SOROBAN_RPC_URL: Joi.string().uri().optional(),
  STELLAR_RPC_URL: Joi.string().uri().optional(),
  LYRICSFLIP_CONTRACT_ID: Joi.string().optional(),
  SOROBAN_ADMIN_SECRET_KEY: Joi.string().optional(),
  CORS_ORIGINS: Joi.string().optional(),
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
  REDIS_URL: Joi.string().optional(),

  // Indexer (LF-221 / LF-223) - all optional, defaults applied in configuration.ts.
  INDEXER_POLL_INTERVAL_MS: Joi.number().integer().min(0).optional(),
  INDEXER_EVENT_LIMIT: Joi.number().integer().min(1).optional(),
  INDEXER_KEEPER_ENABLED: Joi.boolean().optional(),
  INDEXER_RETENTION_DAYS: Joi.number().integer().min(0).optional(),
  INDEXER_START_LEDGER: Joi.number().integer().min(0).optional(),
});