export declare enum LovePageStatus {
    DRAFT = "DRAFT",
    PENDING_PAYMENT = "PENDING_PAYMENT",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    ARCHIVED = "ARCHIVED"
}
export interface LovePageSnapshot {
    id: string;
    userId: string;
    slug: string;
    title: string;
    contentJson: unknown | null;
    status: LovePageStatus;
    pendingPaymentId: string | null;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LovePage {
    private snapshot;
    private constructor();
    static create(params: {
        id: string;
        userId: string;
        slug: string;
        title: string;
        contentJson?: unknown | null;
    }): LovePage;
    static reconstitute(snapshot: LovePageSnapshot): LovePage;
    get id(): string;
    get userId(): string;
    get status(): LovePageStatus;
    get pendingPaymentId(): string | null;
    toSnapshot(): LovePageSnapshot;
    requestPublication(paymentId: string): void;
    activateUponConfirmedPayment(paymentId: string): void;
    markExpired(now: Date): void;
    archive(): void;
}
//# sourceMappingURL=love-page.d.ts.map