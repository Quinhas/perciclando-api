import { Module } from '@nestjs/common';
import { TicketsRepository } from '../app/repositories/tickets.repository';
import { UsersRepository } from '../app/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTicketsRepository } from './prisma/repositories/prisma-tickets.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    { provide: TicketsRepository, useClass: PrismaTicketsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [TicketsRepository, UsersRepository],
})
export class DatabaseModule {}
