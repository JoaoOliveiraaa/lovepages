import { DEFAULT_CURRENCY, LOVE_PAGE_PRICE_CENTS } from "@lovepages/shared";
import { DomainError } from "./domain-error";

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  REFUNDED = "REFUNDED",
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

export class Payment {
  private constructor(private snapshot: PaymentSnapshot) {}

  static createIntent(params: {
    id: string;
    lovePageId: string;
    userId: string;
    amountCents: number;
    currency: string;
    idempotencyKey: string;
  }): Payment {
    if (params.amountCents !== LOVE_PAGE_PRICE_CENTS) {
      throw new DomainError("INVALID_AMOUNT", `Valor deve ser ${LOVE_PAGE_PRICE_CENTS} centavos`);
    }
    if (params.currency !== DEFAULT_CURRENCY) {
      throw new DomainError("INVALID_CURRENCY", `Moeda deve ser ${DEFAULT_CURRENCY}`);
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

  static reconstitute(snapshot: PaymentSnapshot): Payment {
    return new Payment({ ...snapshot });
  }

  get id(): string {
    return this.snapshot.id;
  }

  get lovePageId(): string {
    return this.snapshot.lovePageId;
  }

  get userId(): string {
    return this.snapshot.userId;
  }

  get status(): PaymentStatus {
    return this.snapshot.status;
  }

  get amountCents(): number {
    return this.snapshot.amountCents;
  }

  get currency(): string {
    return this.snapshot.currency;
  }

  get idempotencyKey(): string {
    return this.snapshot.idempotencyKey;
  }

  toSnapshot(): PaymentSnapshot {
    return { ...this.snapshot };
  }

  attachProviderPaymentId(providerPaymentId: string): void {
    if (this.snapshot.status !== PaymentStatus.PENDING) {
      throw new DomainError("PAYMENT_NOT_PENDING", "Não é possível anexar provedor neste estado");
    }
    this.snapshot.providerPaymentId = providerPaymentId;
    this.snapshot.updatedAt = new Date();
  }

  /**
   * Idempotente por providerEventId: mesmo evento duas vezes => noop.
   * Evento distinto após PAID => erro (possível fraude ou bug).
   */
  markPaid(paidAt: Date, providerEventId: string): MarkPaidResult {
    if (this.snapshot.status === PaymentStatus.PAID) {
      if (this.snapshot.lastProviderEventId === providerEventId) {
        return "noop";
      }
      throw new DomainError(
        "CONFLICTING_PAID_EVENT",
        "Pagamento já confirmado com outro evento do provedor",
      );
    }
    if (this.snapshot.status !== PaymentStatus.PENDING) {
      throw new DomainError("PAYMENT_NOT_PENDING", "Somente pagamento pendente pode ser confirmado");
    }
    this.snapshot.status = PaymentStatus.PAID;
    this.snapshot.paidAt = paidAt;
    this.snapshot.lastProviderEventId = providerEventId;
    this.snapshot.updatedAt = new Date();
    return "applied";
  }
}
