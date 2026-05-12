"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
class DomainError extends Error {
    code;
    constructor(code, message) {
        super(message ?? code);
        this.name = "DomainError";
        this.code = code;
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domain-error.js.map