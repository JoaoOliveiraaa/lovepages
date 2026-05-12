import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "../common/public.decorator";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post("register")
  register(@Body() body: unknown) {
    return this.auth.register(body);
  }

  @Public()
  @Post("login")
  login(@Body() body: unknown) {
    return this.auth.login(body);
  }

  @Public()
  @Post("refresh")
  refresh(@Body() body: unknown) {
    return this.auth.refresh(body);
  }
}
