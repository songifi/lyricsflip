import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from './utility/Swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, swaggerCustomOptions);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
