import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  PaymentStatus as PrismaPaymentStatus,
  LovePageStatus as PrismaLovePageStatus,
  WebhookDeliveryStatus,
  WebhookProvider,
} from "@prisma/client";
import { z } from "zod";
import { verifyWebhookSignature } from "@lovepages/shared";
import { PrismaService } from "../prisma/prisma.service";
import { lovePageFromRow } from "../love-pages/love-page.mapper";
import { paymentFromRow } from "../payments/payment.mapper";

const webhookBodySchema = z.object({
  id: z.string().min(1),
  data: z.object({
    providerPaymentId: z.string().min(1),
    status: z.string(),
    amountCents: z.number().int().optional(),
  }),
});

function isPrismaUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}

@Injectable()
export class WebhooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async handleAbacatePay(rawBody: Buffer, signatureHeader: string | undefined) {
    const secret = this.config.getOrThrow<string>("ABACATE_WEBHOOK_SECRET");
    if (!verifyWebhookSignature(rawBody, signatureHeader, secret)) {
      throw new UnauthorizedException("Assinatura inválida");
    }

    let parsed: z.infer<typeof webhookBodySchema>;
    try {
      const json: unknown = JSON.parse(rawBody.toString("utf8"));
      parsed = webhookBodySchema.parse(json);
    } catch {
      throw new BadRequestException("Payload inválido");
    }

    let deliveryId: string;
    try {
      const created = await this.prisma.webhookDelivery.create({
        data: {
          provider: WebhookProvider.ABACATE_PAY,
          providerEventId: parsed.id,
          payloadRaw: rawBody.toString("utf8"),
          signatureValid: true,
          status: WebhookDeliveryStatus.RECEIVED,
        },
      });
      deliveryId = created.id;
    } catch (error: unknown) {
      if (isPrismaUniqueViolation(error)) {
        return { ok: true, duplicate: true };
      }
      throw error;
    }

    const paid = parsed.data.status.toLowerCase() === "paid";
    if (!paid) {
      await this.prisma.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: WebhookDeliveryStatus.PROCESSED,
          processedAt: new Date(),
          errorMessage: "IGNORED_NON_PAID",
        },
      });
      return { ok: true, ignored: true };
    }

    const payRow = await this.prisma.payment.findFirst({
      where: { providerPaymentId: parsed.data.providerPaymentId },
    });
    if (!payRow) {
      await this.prisma.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: WebhookDeliveryStatus.FAILED,
          processedAt: new Date(),
          errorMessage: "PAYMENT_NOT_FOUND",
        },
      });
      return { ok: false, code: "PAYMENT_NOT_FOUND" };
    }

    if (parsed.data.amountCents != null && parsed.data.amountCents !== payRow.amountCents) {
      await this.prisma.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: WebhookDeliveryStatus.FAILED,
          processedAt: new Date(),
          errorMessage: "AMOUNT_MISMATCH",
        },
      });
      return { ok: false, code: "AMOUNT_MISMATCH" };
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        const lockedPayment = await tx.payment.findFirstOrThrow({
          where: { id: payRow.id },
        });
        const lockedPage = await tx.lovePage.findFirstOrThrow({
          where: { id: lockedPayment.lovePageId },
        });

        const payment = paymentFromRow(lockedPayment);
        const paidAt = new Date();
        const outcome = payment.markPaid(paidAt, parsed.id);

        if (outcome === "applied") {
          const lp = lovePageFromRow(lockedPage);
          lp.activateUponConfirmedPayment(payment.id);
          const l1 = lp.toSnapshot();
          await tx.lovePage.update({
            where: { id: lockedPage.id },
            data: {
              status: l1.status as unknown as PrismaLovePageStatus,
              pendingPaymentId: null,
            },
          });
        }

        const p1 = payment.toSnapshot();
        await tx.payment.update({
          where: { id: lockedPayment.id },
          data: {
            status: p1.status as unknown as PrismaPaymentStatus,
            paidAt: p1.paidAt,
            lastProviderEventId: p1.lastProviderEventId,
          },
        });

        await tx.outboxMessage.create({
          data: {
            type: outcome === "applied" ? "PAGE_ACTIVATED" : "PAYMENT_WEBHOOK_NOOP",
            payload: {
              lovePageId: lockedPayment.lovePageId,
              paymentId: lockedPayment.id,
              providerEventId: parsed.id,
            },
          },
        });

        await tx.webhookDelivery.update({
          where: { id: deliveryId },
          data: {
            status: WebhookDeliveryStatus.PROCESSED,
            processedAt: new Date(),
            paymentId: lockedPayment.id,
          },
        });
      });
    } catch (error: unknown) {
      await this.prisma.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: WebhookDeliveryStatus.FAILED,
          processedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : "UNKNOWN",
        },
      });
      throw error;
    }

    return { ok: true };
  }
}
