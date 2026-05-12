export const ABACATE_PAY_PORT = Symbol("ABACATE_PAY_PORT");

export type CreateChargeInput = {
  amountCents: number;
  currency: string;
  externalReference: string;
};

export interface AbacatePayPort {
  createCharge(input: CreateChargeInput): Promise<{ providerPaymentId: string }>;
}
