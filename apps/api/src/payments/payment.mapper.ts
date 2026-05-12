import { Payment, PaymentSnapshot, PaymentStatus } from "@lovepages/domain";
import { Payment as PrismaPayment, PaymentStatus as PrismaPaymentStatus } from "@prisma/client";

function toDomainPaymentStatus(s: PrismaPaymentStatus): PaymentStatus {
  return s as unknown as PaymentStatus;
}

export function paymentToSnapshot(row: PrismaPayment): PaymentSnapshot {
  return {
    id: row.id,
    lovePageId: row.lovePageId,
    userId: row.userId,
    amountCents: row.amountCents,
    currency: row.currency,
    status: toDomainPaymentStatus(row.status),
    providerPaymentId: row.providerPaymentId,
    idempotencyKey: row.idempotencyKey,
    paidAt: row.paidAt,
    lastProviderEventId: row.lastProviderEventId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function paymentFromRow(row: PrismaPayment): Payment {
  return Payment.reconstitute(paymentToSnapshot(row));
}
