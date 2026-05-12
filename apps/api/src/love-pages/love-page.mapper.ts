import { LovePage, LovePageSnapshot, LovePageStatus } from "@lovepages/domain";
import { LovePage as PrismaLovePage, LovePageStatus as PrismaLovePageStatus } from "@prisma/client";

function toDomainStatus(s: PrismaLovePageStatus): LovePageStatus {
  return s as unknown as LovePageStatus;
}

export function lovePageToSnapshot(row: PrismaLovePage): LovePageSnapshot {
  return {
    id: row.id,
    userId: row.userId,
    slug: row.slug,
    title: row.title,
    contentJson: row.contentJson,
    status: toDomainStatus(row.status),
    pendingPaymentId: row.pendingPaymentId,
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function lovePageFromRow(row: PrismaLovePage): LovePage {
  return LovePage.reconstitute(lovePageToSnapshot(row));
}
