export interface IAnalyticsMetric {
  id: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface IPlayerEngagement extends IAnalyticsMetric {
  userId: string
  sessionCount: number
  sessionDuration: number
  activityData: Record<string, any>
}

export interface ISongCategory extends IAnalyticsMetric {
  categoryId: string
  playCount: number
  uniqueUsers: number
  averagePlayTime: number
}

export interface ITokenMetric extends IAnalyticsMetric {
  totalSupply: number
  circulation: number
  transactions: number
  averageHolding: number
}

export interface IUserProgression extends IAnalyticsMetric {
  userId: string
  level: number
  experience: number
  achievements: string[]
}

