"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    starknet: {
        network: process.env.STARKNET_NETWORK,
    },
});
//# sourceMappingURL=configuration.js.map