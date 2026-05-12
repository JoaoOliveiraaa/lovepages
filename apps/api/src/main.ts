import { execSync } from "node:child_process";
import { join } from "node:path";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import { loadValidatedEnv } from "./config/validate-boot-env";
import { assertMigrationsApplied } from "./prisma/migration-check";

async function bootstrap() {
  const bootEnv = loadValidatedEnv();

  const apiRoot = join(__dirname, "..");
  if (bootEnv.RUN_MIGRATIONS_ON_BOOT) {
    // eslint-disable-next-line no-console
    console.log("[lovepages-api][boot] Executando prisma migrate deploy...");
    execSync("pnpm exec prisma migrate deploy", {
      stdio: "inherit",
      env: process.env,
      cwd: apiRoot,
    });
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>("PORT");

  const prisma = app.get(PrismaService);
  try {
    await prisma.$connect();
    await assertMigrationsApplied(prisma);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lovepages-api][boot] Falha ao validar banco/migrations:");
    // eslint-disable-next-line no-console
    console.error(err);
    await app.close();
    process.exit(1);
  }

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`[lovepages-api] OK — http://localhost:${port}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
