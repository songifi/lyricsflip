export default () => ({
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60, // Default 60 seconds
    limit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 10, // Default 10 requests per user/IP
  },
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  starknet: {
    network: process.env.STARKNET_NETWORK,
  },
});