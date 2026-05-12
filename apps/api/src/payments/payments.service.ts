import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { z } from "zod";
import { Payment } from "@lovepages/domain";
import { DEFAULT_CURRENCY, LOVE_PAGE_PRICE_CENTS } from "@lovepages/shared";
import { LovePageStatus as PrismaLovePageStatus, PaymentStatus as PrismaPaymentStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ABACATE_PAY_PORT, type AbacatePayPort } from "./abacate-pay.port";
import { lovePageFromRow } from "../love-pages/love-page.mapper";
import { paymentFromRow } from "./payment.mapper";

const intentSchema = z.object({
  lovePageId: z.string().uuid(),
});

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ABACATE_PAY_PORT) private readonly abacate: AbacatePayPort,
  ) {}

  async createIntent(userId: string, idempotencyKey: string, raw: unknown) {
    const body = intentSchema.parse(raw);

    const existing = await this.prisma.payment.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      if (existing.userId !== userId) {
        throw new ForbiddenException();
      }
      return {
        paymentId: existing.id,
        providerPaymentId: existing.providerPaymentId,
        idempotentReplay: true,
      };
    }

    const page = await this.prisma.lovePage.findFirst({
      where: { id: body.lovePageId, userId },
    });
    if (!page) {
      throw new NotFoundException("LovePage não encontrada");
    }
    if (page.status !== PrismaLovePageStatus.DRAFT) {
      throw new BadRequestException("LovePage precisa estar em DRAFT");
    }

    const paymentId = randomUUID();
    const domainPayment = Payment.createIntent({
      id: paymentId,
      lovePageId: body.lovePageId,
      userId,
      amountCents: LOVE_PAGE_PRICE_CENTS,
      currency: DEFAULT_CURRENCY,
      idempotencyKey,
    });
    const p0 = domainPayment.toSnapshot();

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          id: p0.id,
          lovePageId: p0.lovePageId,
          userId: p0.userId,
          amountCents: p0.amountCents,
          currency: p0.currency,
          status: p0.status as unknown as PrismaPaymentStatus,
          idempotencyKey: p0.idempotencyKey,
        },
      });

      const lp = lovePageFromRow(page);
      lp.requestPublication(paymentId);
      const l1 = lp.toSnapshot();

      await tx.lovePage.update({
        where: { id: body.lovePageId },
        data: {
          status: l1.status as unknown as PrismaLovePageStatus,
          pendingPaymentId: paymentId,
        },
      });
    });

    const { providerPaymentId } = await this.abacate.createCharge({
      amountCents: LOVE_PAGE_PRICE_CENTS,
      currency: DEFAULT_CURRENCY,
      externalReference: paymentId,
    });

    const row = await this.prisma.payment.findUniqueOrThrow({ where: { id: paymentId } });
    const pay = paymentFromRow(row);
    pay.attachProviderPaymentId(providerPaymentId);
    const p1 = pay.toSnapshot();

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        providerPaymentId: p1.providerPaymentId,
        updatedAt: new Date(),
      },
    });

    return { paymentId, providerPaymentId, idempotentReplay: false };
  }
}
