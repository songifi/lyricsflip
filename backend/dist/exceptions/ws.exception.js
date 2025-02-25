"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsException = void 0;
class WsException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        this.name = 'WsException';
    }
}
exports.WsException = WsException;
//# sourceMappingURL=ws.exception.js.map