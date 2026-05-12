import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { z } from "zod";
import { LovePage } from "@lovepages/domain";
import { LovePageStatus as PrismaLovePageStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { lovePageFromRow } from "./love-page.mapper";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(8)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "slug inválido"),
});

@Injectable()
export class LovePagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, raw: unknown) {
    const body = createSchema.parse(raw);
    const id = randomUUID();
    const lp = LovePage.create({
      id,
      userId,
      slug: body.slug,
      title: body.title,
    });
    const snap = lp.toSnapshot();
    try {
      await this.prisma.lovePage.create({
        data: {
          id: snap.id,
          userId: snap.userId,
          slug: snap.slug,
          title: snap.title,
          contentJson: snap.contentJson ?? undefined,
          status: snap.status as unknown as PrismaLovePageStatus,
        },
      });
    } catch (e: unknown) {
      const code = typeof e === "object" && e && "code" in e ? (e as { code: string }).code : "";
      if (code === "P2002") {
        throw new BadRequestException("Slug já em uso");
      }
      throw e;
    }
    return { id: snap.id, slug: snap.slug, status: snap.status };
  }

  async getOwned(userId: string, lovePageId: string) {
    const row = await this.prisma.lovePage.findFirst({
      where: { id: lovePageId, userId },
    });
    if (!row) {
      throw new NotFoundException();
    }
    return lovePageFromRow(row).toSnapshot();
  }
}
