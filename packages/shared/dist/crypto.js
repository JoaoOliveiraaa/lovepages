"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABACATE_PAY = void 0;
exports.hashRefreshToken = hashRefreshToken;
exports.newRefreshTokenValue = newRefreshTokenValue;
exports.signWebhookBody = signWebhookBody;
exports.verifyWebhookSignature = verifyWebhookSignature;
const crypto_1 = require("crypto");
exports.ABACATE_PAY = "ABACATE_PAY";
function hashRefreshToken(token) {
    return (0, crypto_1.createHash)("sha256").update(token).digest("hex");
}
function newRefreshTokenValue() {
    return (0, crypto_1.randomBytes)(48).toString("base64url");
}
function signWebhookBody(rawBody, secret) {
    return (0, crypto_1.createHmac)("sha256", secret).update(rawBody).digest("hex");
}
function verifyWebhookSignature(rawBody, signatureHeader, secret) {
    if (!signatureHeader) {
        return false;
    }
    const expected = signWebhookBody(rawBody, secret);
    const a = Buffer.from(signatureHeader, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) {
        return false;
    }
    return (0, crypto_1.timingSafeEqual)(a, b);
}
//# sourceMappingURL=crypto.js.map