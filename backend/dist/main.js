"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Songify LyricFlip API')
        .setDescription('API documentation for the Songify LyricFlip backend')
        .setVersion('1.0')
        .addTag('lyricflip')
        .addTag('songs')
        .addTag('users')
        .addTag('admin')
        .setContact('Songify Support', 'https://songify.com/support', 'support@songify.com')
        .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
        .setTermsOfService('https://songify.com/terms')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map