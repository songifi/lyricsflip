import * as Joi from 'joi';
import { StrKey } from '@stellar/stellar-sdk';

const contractIdSchema = Joi.string().custom((value: string, helpers) => {
  if (!StrKey.isValidContract(value)) {
    return helpers.error('any.invalid', {
      message: `"${value}" is not a valid Stellar contract ID (expected a StrKey-encoded contract address starting with "C")`,
    });
  }
  return value;
}, 'Stellar contract ID validation');

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
  LYRICSFLIP_CONTRACT_ID: contractIdSchema.optional(),
  LYRICSFLIP_NFT_CONTRACT_ID: contractIdSchema.optional(),
  SOROBAN_ADMIN_SECRET_KEY: Joi.string().optional(),
  CORS_ORIGINS: Joi.string().optional(),
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
  REDIS_URL: Joi.string().optional(),
});