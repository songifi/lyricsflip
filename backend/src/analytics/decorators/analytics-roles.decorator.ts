import { SetMetadata } from "@nestjs/common"
import type { AnalyticsRole } from "../enums/analytics-role.enum"

export const AnalyticsRoles = (...roles: AnalyticsRole[]) => SetMetadata("roles", roles)

