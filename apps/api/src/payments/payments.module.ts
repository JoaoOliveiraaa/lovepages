import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ABACATE_PAY_PORT } from "./abacate-pay.port";
import { MockAbacatePayGateway } from "./mock-abacate-pay.gateway";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  imports: [AuthModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    { provide: ABACATE_PAY_PORT, useClass: MockAbacatePayGateway },
  ],
})
export class PaymentsModule {}
