declare const _default: (() => {
    secret: string;
    audience: string;
    issuer: string;
    ttl: number;
    refreshttl: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    audience: string;
    issuer: string;
    ttl: number;
    refreshttl: number;
}>;
export default _default;
