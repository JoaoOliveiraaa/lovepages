import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import { hashRefreshToken, newRefreshTokenValue } from "@lovepages/shared";
import { PrismaService } from "../prisma/prisma.service";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(raw: unknown) {
    const body = registerSchema.parse(raw);
    const existing = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      throw new ConflictException("Email já cadastrado");
    }
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        role: UserRole.USER,
      },
    });
    return this.issueTokens(user.id, user.email, user.role);
  }

  async login(raw: unknown) {
    const body = loginSchema.parse(raw);
    const user = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    return this.issueTokens(user.id, user.email, user.role);
  }

  async refresh(raw: unknown) {
    const body = refreshSchema.parse(raw);
    const tokenHash = hashRefreshToken(body.refreshToken);
    const row = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
    if (!row || row.revokedAt || row.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh inválido");
    }
    return this.issueTokens(row.user.id, row.user.email, row.user.role);
  }

  private async issueTokens(userId: string, email: string, role: UserRole) {
    const accessTtl = this.config.getOrThrow<number>("JWT_ACCESS_TTL_SEC");
    const refreshTtl = this.config.getOrThrow<number>("JWT_REFRESH_TTL_SEC");
    const accessSecret = this.config.getOrThrow<string>("JWT_ACCESS_SECRET");

    const accessToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { secret: accessSecret, expiresIn: accessTtl },
    );

    const refreshPlain = newRefreshTokenValue();
    const tokenHash = hashRefreshToken(refreshPlain);
    const expiresAt = new Date(Date.now() + refreshTtl * 1000);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshPlain,
      expiresInSec: accessTtl,
    };
  }
}
