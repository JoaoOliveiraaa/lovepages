"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LovePage = exports.LovePageStatus = void 0;
const domain_error_1 = require("./domain-error");
var LovePageStatus;
(function (LovePageStatus) {
    LovePageStatus["DRAFT"] = "DRAFT";
    LovePageStatus["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    LovePageStatus["ACTIVE"] = "ACTIVE";
    LovePageStatus["EXPIRED"] = "EXPIRED";
    LovePageStatus["ARCHIVED"] = "ARCHIVED";
})(LovePageStatus || (exports.LovePageStatus = LovePageStatus = {}));
class LovePage {
    snapshot;
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    static create(params) {
        const now = new Date();
        return new LovePage({
            id: params.id,
            userId: params.userId,
            slug: params.slug,
            title: params.title,
            contentJson: params.contentJson ?? null,
            status: LovePageStatus.DRAFT,
            pendingPaymentId: null,
            expiresAt: null,
            createdAt: now,
            updatedAt: now,
        });
    }
    static reconstitute(snapshot) {
        return new LovePage({ ...snapshot });
    }
    get id() {
        return this.snapshot.id;
    }
    get userId() {
        return this.snapshot.userId;
    }
    get status() {
        return this.snapshot.status;
    }
    get pendingPaymentId() {
        return this.snapshot.pendingPaymentId;
    }
    toSnapshot() {
        return { ...this.snapshot };
    }
    requestPublication(paymentId) {
        if (this.snapshot.status !== LovePageStatus.DRAFT) {
            throw new domain_error_1.DomainError("LOVE_PAGE_NOT_DRAFT", "Somente rascunho pode solicitar publicação");
        }
        this.snapshot.status = LovePageStatus.PENDING_PAYMENT;
        this.snapshot.pendingPaymentId = paymentId;
        this.snapshot.updatedAt = new Date();
    }
    activateUponConfirmedPayment(paymentId) {
        if (this.snapshot.status !== LovePageStatus.PENDING_PAYMENT) {
            throw new domain_error_1.DomainError("LOVE_PAGE_NOT_PENDING_PAYMENT", "Página não está aguardando pagamento");
        }
        if (this.snapshot.pendingPaymentId !== paymentId) {
            throw new domain_error_1.DomainError("PAYMENT_MISMATCH", "Pagamento não corresponde ao pendente");
        }
        this.snapshot.status = LovePageStatus.ACTIVE;
        this.snapshot.pendingPaymentId = null;
        this.snapshot.updatedAt = new Date();
    }
    markExpired(now) {
        if (this.snapshot.status !== LovePageStatus.ACTIVE) {
            return;
        }
        if (!this.snapshot.expiresAt || this.snapshot.expiresAt > now) {
            return;
        }
        this.snapshot.status = LovePageStatus.EXPIRED;
        this.snapshot.updatedAt = now;
    }
    archive() {
        this.snapshot.status = LovePageStatus.ARCHIVED;
        this.snapshot.updatedAt = new Date();
    }
}
exports.LovePage = LovePage;
//# sourceMappingURL=love-page.js.map