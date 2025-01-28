import { ConfigService } from './providers/config.service';
export declare class TestConfigController {
    private configService;
    constructor(configService: ConfigService);
    getConfig(): {
        environment: any;
        port: number;
        starknetNetwork: string;
        isDev: boolean;
    };
}
