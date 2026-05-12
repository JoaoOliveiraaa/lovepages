import "dotenv/config";
import * as bcrypt from "bcrypt";
import { PrismaClient, UserRole, LovePageStatus } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@lovepages.local";
const USER_EMAIL = process.env.SEED_USER_EMAIL ?? "user@lovepages.local";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "SeedAdmin!local-12";
const USER_PASSWORD = process.env.SEED_USER_PASSWORD ?? "SeedUser!local-12";
const DEMO_SLUG = process.env.SEED_LOVE_PAGE_SLUG ?? "seed-demo-lovepage";

async function main() {
  const rounds = 12;
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, rounds);
  const userHash = await bcrypt.hash(USER_PASSWORD, rounds);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash: adminHash, role: UserRole.ADMIN },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: adminHash,
      role: UserRole.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: USER_EMAIL },
    update: { passwordHash: userHash, role: UserRole.USER },
    create: {
      email: USER_EMAIL,
      passwordHash: userHash,
      role: UserRole.USER,
    },
  });

  await prisma.lovePage.upsert({
    where: { slug: DEMO_SLUG },
    update: {
      title: "Página de demonstração (seed)",
      status: LovePageStatus.DRAFT,
      userId: user.id,
    },
    create: {
      userId: user.id,
      slug: DEMO_SLUG,
      title: "Página de demonstração",
      status: LovePageStatus.DRAFT,
    },
  });

  // eslint-disable-next-line no-console
  console.log("[seed] OK — usuários e love_page de demonstração.");
  // eslint-disable-next-line no-console
  console.log(`[seed] admin: ${ADMIN_EMAIL} (role ADMIN)`);
  // eslint-disable-next-line no-console
  console.log(`[seed] user:  ${USER_EMAIL} (role USER)`);
  // eslint-disable-next-line no-console
  console.log(`[seed] love_page slug: ${DEMO_SLUG}`);
  // eslint-disable-next-line no-console
  console.log("[seed] Defina SEED_ADMIN_PASSWORD / SEED_USER_PASSWORD no ambiente para trocar senhas.");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
