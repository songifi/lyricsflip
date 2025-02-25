import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private configService;
    constructor(configService: NestConfigService);
    get<T = any>(key: string): T;
    isDevelopment(): boolean;
    isProduction(): boolean;
    getPort(): number;
    getDatabaseUrl(): string;
    getJwtSecret(): string;
    getStarknetNetwork(): string;
}
