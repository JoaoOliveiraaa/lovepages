import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AppConfigModule } from "./config/app-config.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { LovePagesModule } from "./love-pages/love-pages.module";
import { PaymentsModule } from "./payments/payments.module";
import { WebhooksModule } from "./webhooks/webhooks.module";
import { AppController } from "./app.controller";
import { JwtAuthGuard } from "./common/jwt-auth.guard";
import { NotFoundJsonFilter } from "./common/not-found.filter";

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    AuthModule,
    LovePagesModule,
    PaymentsModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: NotFoundJsonFilter },
  ],
})
export class AppModule {}
