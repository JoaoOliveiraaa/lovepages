import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { parseBootEnv } from "../src/config/env.schema";

async function main() {
  // eslint-disable-next-line no-console
  console.log("[system:check] Validando env...");
  parseBootEnv();

  const prisma = new PrismaClient();
  // eslint-disable-next-line no-console
  console.log("[system:check] Conectando ao banco...");
  await prisma.$connect();

  // eslint-disable-next-line no-console
  console.log("[system:check] Verificando migrations aplicadas...");
  const rows = await prisma.$queryRaw<Array<{ c: bigint | number }>>`
    SELECT COUNT(*) AS c FROM _prisma_migrations WHERE finished_at IS NOT NULL
  `;
  const count = Number(rows[0]?.c ?? 0);
  if (count === 0) {
    throw new Error("Nenhuma migration aplicada. Rode: pnpm db:migrate");
  }

  await prisma.$queryRaw`SELECT 1`;

  await prisma.$disconnect();

  // eslint-disable-next-line no-console
  console.log("[system:check] OK — env, DB, migrations e query básica.");
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("[system:check] FALHA:", e);
  process.exit(1);
});
