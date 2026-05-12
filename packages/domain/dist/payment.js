"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentStatus = void 0;
const shared_1 = require("@lovepages/shared");
const domain_error_1 = require("./domain-error");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["EXPIRED"] = "EXPIRED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
class Payment {
    snapshot;
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    static createIntent(params) {
        if (params.amountCents !== shared_1.LOVE_PAGE_PRICE_CENTS) {
            throw new domain_error_1.DomainError("INVALID_AMOUNT", `Valor deve ser ${shared_1.LOVE_PAGE_PRICE_CENTS} centavos`);
        }
        if (params.currency !== shared_1.DEFAULT_CURRENCY) {
            throw new domain_error_1.DomainError("INVALID_CURRENCY", `Moeda deve ser ${shared_1.DEFAULT_CURRENCY}`);
        }
        const now = new Date();
        return new Payment({
            id: params.id,
            lovePageId: params.lovePageId,
            userId: params.userId,
            amountCents: params.amountCents,
            currency: params.currency,
            status: PaymentStatus.PENDING,
            providerPaymentId: null,
            idempotencyKey: params.idempotencyKey,
            paidAt: null,
            lastProviderEventId: null,
            createdAt: now,
            updatedAt: now,
        });
    }
    static reconstitute(snapshot) {
        return new Payment({ ...snapshot });
    }
    get id() {
        return this.snapshot.id;
    }
    get lovePageId() {
        return this.snapshot.lovePageId;
    }
    get userId() {
        return this.snapshot.userId;
    }
    get status() {
        return this.snapshot.status;
    }
    get amountCents() {
        return this.snapshot.amountCents;
    }
    get currency() {
        return this.snapshot.currency;
    }
    get idempotencyKey() {
        return this.snapshot.idempotencyKey;
    }
    toSnapshot() {
        return { ...this.snapshot };
    }
    attachProviderPaymentId(providerPaymentId) {
        if (this.snapshot.status !== PaymentStatus.PENDING) {
            throw new domain_error_1.DomainError("PAYMENT_NOT_PENDING", "Não é possível anexar provedor neste estado");
        }
        this.snapshot.providerPaymentId = providerPaymentId;
        this.snapshot.updatedAt = new Date();
    }
    /**
     * Idempotente por providerEventId: mesmo evento duas vezes => noop.
     * Evento distinto após PAID => erro (possível fraude ou bug).
     */
    markPaid(paidAt, providerEventId) {
        if (this.snapshot.status === PaymentStatus.PAID) {
            if (this.snapshot.lastProviderEventId === providerEventId) {
                return "noop";
            }
            throw new domain_error_1.DomainError("CONFLICTING_PAID_EVENT", "Pagamento já confirmado com outro evento do provedor");
        }
        if (this.snapshot.status !== PaymentStatus.PENDING) {
            throw new domain_error_1.DomainError("PAYMENT_NOT_PENDING", "Somente pagamento pendente pode ser confirmado");
        }
        this.snapshot.status = PaymentStatus.PAID;
        this.snapshot.paidAt = paidAt;
        this.snapshot.lastProviderEventId = providerEventId;
        this.snapshot.updatedAt = new Date();
        return "applied";
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.js.map