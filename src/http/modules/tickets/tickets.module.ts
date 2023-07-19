import { Module } from '@nestjs/common';
import { CreateTicketUseCase } from '../../../app/use-cases/tickets/create-ticket.use-case';
import { GetTicketByIdUseCase } from '../../../app/use-cases/tickets/get-ticket-by-id';
import { ValidateTicketUseCase } from '../../../app/use-cases/tickets/validate-ticket.use-case';
import { DatabaseModule } from '../../../database/database.module';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketsController],
  providers: [GetTicketByIdUseCase, CreateTicketUseCase, ValidateTicketUseCase],
  exports: [],
})
export class TicketsModule {}
