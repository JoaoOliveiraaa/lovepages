import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/current-user.decorator";
import type { RequestUser } from "../auth/jwt.strategy";
import { LovePagesService } from "./love-pages.service";

@Controller("love-pages")
@UseGuards(AuthGuard("jwt"))
export class LovePagesController {
  constructor(private readonly lovePages: LovePagesService) {}

  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: unknown) {
    return this.lovePages.create(user.userId, body);
  }

  @Get(":id")
  getOne(@CurrentUser() user: RequestUser, @Param("id") id: string) {
    return this.lovePages.getOwned(user.userId, id);
  }
}
