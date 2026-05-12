export declare const ABACATE_PAY: "ABACATE_PAY";
export declare function hashRefreshToken(token: string): string;
export declare function newRefreshTokenValue(): string;
export declare function signWebhookBody(rawBody: Buffer, secret: string): string;
export declare function verifyWebhookSignature(rawBody: Buffer, signatureHeader: string | undefined, secret: string): boolean;
//# sourceMappingURL=crypto.d.ts.map