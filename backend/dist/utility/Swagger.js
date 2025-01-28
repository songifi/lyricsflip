"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerCustomOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
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
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
}, 'access-token')
    .build();
exports.swaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Songify API Docs',
};
//# sourceMappingURL=Swagger.js.map