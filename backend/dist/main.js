"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const Swagger_1 = require("./utility/Swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV !== 'production') {
        const document = swagger_1.SwaggerModule.createDocument(app, Swagger_1.swaggerConfig);
        swagger_1.SwaggerModule.setup('api/docs', app, document, Swagger_1.swaggerCustomOptions);
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map