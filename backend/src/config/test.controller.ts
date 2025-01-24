import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './providers/config.service';

@Controller('config-test')
export class TestConfigController {
  constructor(private configService: ConfigService) {}

  @Get()
  getConfig() {
    return {
      environment: this.configService.get('nodeEnv'),
      port: this.configService.getPort(),
      starknetNetwork: this.configService.getStarknetNetwork(),
      isDev: this.configService.isDevelopment()
    };
  }
}