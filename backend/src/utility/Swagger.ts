import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Songify LyricFlip API')
  .setDescription('API documentation for the Songify LyricFlip backend')
  .setVersion('1.0')
  .addTag('lyricflip')
  .addTag('songs')
  .addTag('users')
  .addTag('admin')
  .setContact(
    'Songify Support',
    'https://songify.com/support',
    'support@songify.com',
  )
  .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
  .setTermsOfService('https://songify.com/terms')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'access-token',
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: { persistAuthorization: true },
  customSiteTitle: 'Songify API Docs',
};
