import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { PrismaService } from "./prisma/prisma.service";
import { Public } from "./common/public.decorator";

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  root() {
    return {
      ok: true,
      service: "lovepages-api",
      health: "/health",
      version: "/version",
    };
  }

  @Public()
  @Get("version")
  version() {
    return {
      name: "@lovepages/api",
      version: process.env.npm_package_version ?? "0.0.1",
      node: process.version,
    };
  }

  @Public()
  @Get("health")
  async health(@Res({ passthrough: true }) res: Response) {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { ok: true, db: true, service: "lovepages-api" };
    } catch {
      res.status(503);
      return { ok: false, db: false, service: "lovepages-api" };
    }
  }
}
