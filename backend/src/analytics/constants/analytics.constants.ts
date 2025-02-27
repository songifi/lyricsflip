export const ANALYTICS_CACHE_TTL = 300 // 5 minutes

export const METRIC_TYPES = {
  PLAYER_ENGAGEMENT: "player_engagement",
  SONG_CATEGORY: "song_category",
  TOKEN_ECONOMY: "token_economy",
  USER_PROGRESSION: "user_progression",
} as const

export const AGGREGATION_PERIODS = {
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
} as const

export const DEFAULT_DATE_RANGE = {
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  endDate: new Date(),
}

export const ANALYTICS_QUEUE = "analytics_queue"

