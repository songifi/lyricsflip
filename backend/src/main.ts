import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from './utility/Swagger';
import { SocketIOAdapter } from './config/socket-io.config';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Logger } from '@nestjs/common';
import { CustomLoggerService } from './logger/custom-logger.service';
import { UserService } from '../../backend/src/user/providers/user.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
    
    
  });
  app.useGlobalGuards(new CustomThrottlerGuard());

  app.useWebSocketAdapter(new SocketIOAdapter(app));

  // const config = new DocumentBuilder()
  //   .setTitle('Songify LyricFlip API')
  //   .setDescription('API documentation for the Songify LyricFlip backend')
  //   .setVersion('1.0')
  //   .addTag('lyricflip')
  //   .addTag('songs')
  //   .addTag('users')
  //   .addTag('admin')
  //   .setContact(
  //     'Songify Support',
  //     'https://songify.com/support',
  //     'support@songify.com',
  //   )
  //   .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
  //   .setTermsOfService('https://songify.com/terms')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  const logger = new Logger('Main');

  const userService = app.get(UserService);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  logger.log('Application starting...');
  logger.debug('Debug message');
  logger.verbose('Verbose message');
  logger.warn('Warning message');
  logger.error('Error message');
 
}

  app.useGlobalInterceptors(new LoggingInterceptor());





  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, swaggerCustomOptions);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
