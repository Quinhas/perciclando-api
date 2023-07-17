import { Module } from '@nestjs/common';
import { TicketsRepository } from '../app/repositories/tickets.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTicketsRepository } from './prisma/repositories/prisma-tickets.repository';

@Module({
  providers: [
    PrismaService,
    { provide: TicketsRepository, useClass: PrismaTicketsRepository },
  ],
  exports: [TicketsRepository],
})
export class DatabaseModule {}
