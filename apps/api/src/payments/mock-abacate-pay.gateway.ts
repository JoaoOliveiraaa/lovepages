import { Injectable } from "@nestjs/common";
import type { AbacatePayPort, CreateChargeInput } from "./abacate-pay.port";

@Injectable()
export class MockAbacatePayGateway implements AbacatePayPort {
  async createCharge(input: CreateChargeInput): Promise<{ providerPaymentId: string }> {
    return {
      providerPaymentId: `abacate_mock_${input.externalReference}`,
    };
  }
}
