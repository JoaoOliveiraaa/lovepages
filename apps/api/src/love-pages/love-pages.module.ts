import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LovePagesController } from "./love-pages.controller";
import { LovePagesService } from "./love-pages.service";

@Module({
  imports: [AuthModule],
  controllers: [LovePagesController],
  providers: [LovePagesService],
})
export class LovePagesModule {}
