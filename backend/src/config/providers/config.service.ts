import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T = any>(key: string): T {
    return this.configService.get<T>(key);
  }

  isDevelopment(): boolean {
    return this.get('nodeEnv') === 'development';
  }

  isProduction(): boolean {
    return this.get('nodeEnv') === 'production';
  }

  getPort(): number {
    return this.get<number>('port');
  }

  getDatabaseUrl(): string {
    return this.get<string>('database.url');
  }

  getJwtSecret(): string {
    return this.get<string>('jwt.secret');
  }

  getStarknetNetwork(): string {
    return this.get<string>('starknet.network');
  }
}