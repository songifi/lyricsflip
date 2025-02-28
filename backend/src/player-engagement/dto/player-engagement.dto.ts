export class PlayerEngagementDto {
    totalSessions: number;
    activeUsers: number;
    averageSessionDuration: number;
    retentionRate: number;
    peakActivityHours: number[];
    dailyRetention: number;
    weeklyRetention: number;
    monthlyRetention: number;
    nDayRetention: Record<number, number>; // { 1: %, 7: %, 30: % }
    churnRiskScore: number;
    engagementDepth: string[];
    cohortGroup: string;
    timestamp: Date;
  }
  