export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    EXPIRED = "EXPIRED",
    REFUNDED = "REFUNDED"
}
export interface PaymentSnapshot {
    id: string;
    lovePageId: string;
    userId: string;
    amountCents: number;
    currency: string;
    status: PaymentStatus;
    providerPaymentId: string | null;
    idempotencyKey: string;
    paidAt: Date | null;
    lastProviderEventId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export type MarkPaidResult = "applied" | "noop";
export declare class Payment {
    private snapshot;
    private constructor();
    static createIntent(params: {
        id: string;
        lovePageId: string;
        userId: string;
        amountCents: number;
        currency: string;
        idempotencyKey: string;
    }): Payment;
    static reconstitute(snapshot: PaymentSnapshot): Payment;
    get id(): string;
    get lovePageId(): string;
    get userId(): string;
    get status(): PaymentStatus;
    get amountCents(): number;
    get currency(): string;
    get idempotencyKey(): string;
    toSnapshot(): PaymentSnapshot;
    attachProviderPaymentId(providerPaymentId: string): void;
    /**
     * Idempotente por providerEventId: mesmo evento duas vezes => noop.
     * Evento distinto após PAID => erro (possível fraude ou bug).
     */
    markPaid(paidAt: Date, providerEventId: string): MarkPaidResult;
}
//# sourceMappingURL=payment.d.ts.map