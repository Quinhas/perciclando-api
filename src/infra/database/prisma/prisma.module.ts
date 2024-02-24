import { Module } from '@nestjs/common';

import { InjectionTokens } from '../../config/injection-tokens';

import { PrismaService } from './prisma.service';
import { PrismaEventsRepository } from './repositories/prisma-events.repository';
import { PrismaMembersRepository } from './repositories/prisma-members.repository';
import { PrismaTicketsRepository } from './repositories/prisma-tickets.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: InjectionTokens.TicketsRepository,
      useClass: PrismaTicketsRepository,
    },
    {
      provide: InjectionTokens.MembersRepository,
      useClass: PrismaMembersRepository,
    },
    {
      provide: InjectionTokens.EventsRepository,
      useClass: PrismaEventsRepository,
    },
  ],
  exports: [
    InjectionTokens.MembersRepository,
    InjectionTokens.TicketsRepository,
    InjectionTokens.EventsRepository,
  ],
})
export class PrismaModule {}
