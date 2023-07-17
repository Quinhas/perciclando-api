import { Module } from '@nestjs/common';
import { CreateTicketUseCase } from '../../../app/use-cases/tickets/create-ticket.use-case';
import { GetTicketByIdUseCase } from '../../../app/use-cases/tickets/get-ticket-by-id';
import { DatabaseModule } from '../../../database/database.module';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketsController],
  providers: [GetTicketByIdUseCase, CreateTicketUseCase],
  exports: [],
})
export class TicketsModule {}
