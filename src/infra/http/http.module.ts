import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtTokenServiceAdapter } from '@infra/adapters/token/jwt-token-service.adapter';
import { InjectionTokens } from '@infra/config/injection-tokens';
import { DatabaseModule } from '@infra/database/database.module';

import { EventsModule } from './controllers/events/events.module';
import { MembersModule } from './controllers/members/members.module';
import { MembersAuthModule } from './controllers/members-auth/members-auth.module';
import { TicketsModule } from './controllers/tickets/tickets.module';
import { MemberAuthGuard } from './guards/member-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    MembersAuthModule,
    MembersModule,
    TicketsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: MemberAuthGuard,
    },
    {
      provide: InjectionTokens.TokenService,
      useClass: JwtTokenServiceAdapter,
    },
  ],
})
export class HttpModule {}
