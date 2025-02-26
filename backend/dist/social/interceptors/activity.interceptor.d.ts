import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ActivityService } from '../services/activity.service';
export declare class ActivityInterceptor implements NestInterceptor {
    private readonly activityService;
    constructor(activityService: ActivityService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private getActivityType;
    private getActivityData;
}
