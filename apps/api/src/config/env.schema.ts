import { z } from "zod";

const WEAK_SECRET_PATTERNS = [/troque/i, /min-32-chars/i, /change.?me/i];

function looksWeakSecret(value: string): boolean {
  return WEAK_SECRET_PATTERNS.some((re) => re.test(value));
}

export const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL obrigatório"),
    PORT: z.coerce.number().int().positive().default(3001),
    JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET precisa ter ao menos 32 caracteres"),
    JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET precisa ter ao menos 32 caracteres"),
    JWT_ACCESS_TTL_SEC: z.coerce.number().int().positive().default(900),
    JWT_REFRESH_TTL_SEC: z.coerce.number().int().positive().default(60 * 60 * 24 * 7),
    ABACATE_WEBHOOK_SECRET: z.string().min(16, "ABACATE_WEBHOOK_SECRET precisa ter ao menos 16 caracteres"),
    ALLOW_INSECURE_DEV: z
      .string()
      .optional()
      .transform((v) => v === "true"),
    RUN_MIGRATIONS_ON_BOOT: z
      .string()
      .optional()
      .transform((v) => v === "true"),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === "production") {
      if (data.DATABASE_URL.startsWith("file:")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Em produção DATABASE_URL não pode ser SQLite (file:). Use PostgreSQL.",
          path: ["DATABASE_URL"],
        });
      }
      if (data.ALLOW_INSECURE_DEV) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ALLOW_INSECURE_DEV não é permitido em NODE_ENV=production.",
          path: ["ALLOW_INSECURE_DEV"],
        });
      }
    }

    const weakJwt =
      looksWeakSecret(data.JWT_ACCESS_SECRET) ||
      looksWeakSecret(data.JWT_REFRESH_SECRET) ||
      looksWeakSecret(data.ABACATE_WEBHOOK_SECRET);

    if (weakJwt && !data.ALLOW_INSECURE_DEV) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Segredos parecem placeholders de exemplo. Defina segredos fortes ou defina ALLOW_INSECURE_DEV=true somente em desenvolvimento.",
        path: ["JWT_ACCESS_SECRET"],
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

export function parseBootEnv(raw: NodeJS.ProcessEnv = process.env): Env {
  return envSchema.parse(raw);
}
