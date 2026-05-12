import {
  Body,
  Controller,
  Headers,
  BadRequestException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/current-user.decorator";
import type { RequestUser } from "../auth/jwt.strategy";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post("intent")
  @UseGuards(AuthGuard("jwt"))
  createIntent(
    @CurrentUser() user: RequestUser,
    @Headers("idempotency-key") idempotencyKey: string | undefined,
    @Body() body: unknown,
  ) {
    const key = idempotencyKey?.trim();
    if (!key) {
      throw new BadRequestException("Header Idempotency-Key é obrigatório");
    }
    return this.payments.createIntent(user.userId, key, body);
  }
}
