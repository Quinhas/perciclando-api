import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTicketUseCase } from '../../../app/use-cases/tickets/create-ticket.use-case';
import { GetTicketByIdUseCase } from '../../../app/use-cases/tickets/get-ticket-by-id';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { FindTicketByIdParams } from './dtos/find-by-id.params';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly createTicket: CreateTicketUseCase,
    private readonly getTicketById: GetTicketByIdUseCase,
  ) {}

  @Get('/:ticketId')
  async findById(@Param() { ticketId }: FindTicketByIdParams) {
    const ticket = await this.getTicketById.execute({
      id: ticketId,
    });

    return ticket;
  }

  @Post('')
  async create(@Body() createTicketDto: CreateTicketDto) {
    const { name, number } = createTicketDto;

    const ticket = await this.createTicket.execute({
      name,
      number,
    });

    return ticket;
  }
}
