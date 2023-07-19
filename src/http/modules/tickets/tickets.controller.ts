import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTicketUseCase } from '../../../app/use-cases/tickets/create-ticket.use-case';
import { GetTicketByIdUseCase } from '../../../app/use-cases/tickets/get-ticket-by-id';
import { ActiveUserId } from '../../decorators/active-user-id.decorator';
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

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const { name, number } = createTicketDto;

    const ticket = await this.createTicket.execute({
      userId,
      name,
      number,
    });

    return ticket;
  }
}
