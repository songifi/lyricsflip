"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../constant/auth-constant");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request[auth_constant_1.REQUEST_USER_KEY];
});
//# sourceMappingURL=current-user.decorator.js.map