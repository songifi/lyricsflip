import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './validation.schema';
import { ConfigService } from './providers/config.service';
import { TestConfigController } from './test.controller';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
  controllers: [TestConfigController]
})
export class ConfigModule {}