import { Controller, Headers, HttpCode, Post, Req, BadRequestException } from "@nestjs/common";
import type { Request } from "express";
import { Public } from "../common/public.decorator";
import { WebhooksService } from "./webhooks.service";

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly webhooks: WebhooksService) {}

  @Public()
  @Post("abacate-pay")
  @HttpCode(200)
  async abacatePay(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers("x-abacate-signature") signature: string | undefined,
  ) {
    const raw = req.rawBody;
    if (!raw || !Buffer.isBuffer(raw)) {
      throw new BadRequestException("rawBody ausente — habilite rawBody no bootstrap");
    }
    return this.webhooks.handleAbacatePay(raw, signature);
  }
}
