import { DomainError } from "./domain-error";

export enum LovePageStatus {
  DRAFT = "DRAFT",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  ARCHIVED = "ARCHIVED",
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

export class LovePage {
  private constructor(private snapshot: LovePageSnapshot) {}

  static create(params: {
    id: string;
    userId: string;
    slug: string;
    title: string;
    contentJson?: unknown | null;
  }): LovePage {
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

  static reconstitute(snapshot: LovePageSnapshot): LovePage {
    return new LovePage({ ...snapshot });
  }

  get id(): string {
    return this.snapshot.id;
  }

  get userId(): string {
    return this.snapshot.userId;
  }

  get status(): LovePageStatus {
    return this.snapshot.status;
  }

  get pendingPaymentId(): string | null {
    return this.snapshot.pendingPaymentId;
  }

  toSnapshot(): LovePageSnapshot {
    return { ...this.snapshot };
  }

  requestPublication(paymentId: string): void {
    if (this.snapshot.status !== LovePageStatus.DRAFT) {
      throw new DomainError("LOVE_PAGE_NOT_DRAFT", "Somente rascunho pode solicitar publicação");
    }
    this.snapshot.status = LovePageStatus.PENDING_PAYMENT;
    this.snapshot.pendingPaymentId = paymentId;
    this.snapshot.updatedAt = new Date();
  }

  activateUponConfirmedPayment(paymentId: string): void {
    if (this.snapshot.status !== LovePageStatus.PENDING_PAYMENT) {
      throw new DomainError(
        "LOVE_PAGE_NOT_PENDING_PAYMENT",
        "Página não está aguardando pagamento",
      );
    }
    if (this.snapshot.pendingPaymentId !== paymentId) {
      throw new DomainError("PAYMENT_MISMATCH", "Pagamento não corresponde ao pendente");
    }
    this.snapshot.status = LovePageStatus.ACTIVE;
    this.snapshot.pendingPaymentId = null;
    this.snapshot.updatedAt = new Date();
  }

  markExpired(now: Date): void {
    if (this.snapshot.status !== LovePageStatus.ACTIVE) {
      return;
    }
    if (!this.snapshot.expiresAt || this.snapshot.expiresAt > now) {
      return;
    }
    this.snapshot.status = LovePageStatus.EXPIRED;
    this.snapshot.updatedAt = now;
  }

  archive(): void {
    this.snapshot.status = LovePageStatus.ARCHIVED;
    this.snapshot.updatedAt = new Date();
  }
}
