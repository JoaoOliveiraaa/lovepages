import type { PrismaService } from "./prisma.service";

export async function assertMigrationsApplied(prisma: PrismaService): Promise<void> {
  try {
    const rows = await prisma.$queryRaw<Array<{ c: bigint | number }>>`
      SELECT COUNT(*) AS c FROM _prisma_migrations WHERE finished_at IS NOT NULL
    `;
    const count = Number(rows[0]?.c ?? 0);
    if (count === 0) {
      throw new Error("Nenhuma migration aplicada (tabela vazia).");
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[lovepages-api][boot] Schema/migrations inconsistentes: ${msg}\n` +
        `Execute na raiz do monorepo: pnpm db:init   (ou: pnpm db:migrate && pnpm db:seed)`,
    );
  }
}
