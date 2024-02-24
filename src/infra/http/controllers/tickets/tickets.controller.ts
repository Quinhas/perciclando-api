import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateTicketUseCase } from '../../../../app/use-cases/tickets/create-ticket.use-case';
import { DeleteTicketUseCase } from '../../../../app/use-cases/tickets/delete-ticket.use-case';
import { GetAllTicketsUseCase } from '../../../../app/use-cases/tickets/get-all-tickets.use-case';
import { GetTicketByIdUseCase } from '../../../../app/use-cases/tickets/get-ticket-by-id';
import { ValidateTicketUseCase } from '../../../../app/use-cases/tickets/validate-ticket.use-case';
import { ActiveMemberId } from '../../decorators/active-member-id.decorator';

import { CreateTicketDto } from './dtos/create-ticket.dto';
import { FindTicketByIdParams } from './dtos/find-by-id.params';
import { ValidateTicketDto } from './dtos/validate-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly getAllTickets: GetAllTicketsUseCase,
    private readonly getTicketById: GetTicketByIdUseCase,
    private readonly createTicket: CreateTicketUseCase,
    private readonly validateTicket: ValidateTicketUseCase,
    private readonly deleteTicket: DeleteTicketUseCase,
  ) {}

  @Get()
  async find() {
    const tickets = await this.getAllTickets.execute();

    return tickets;
  }

  @Get('/:ticketId')
  async findById(@Param() { ticketId }: FindTicketByIdParams) {
    const ticket = await this.getTicketById.execute({
      id: ticketId,
    });

    return ticket;
  }

  @Post()
  async create(
    @ActiveMemberId() memberId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const { name, number } = createTicketDto;

    const ticket = await this.createTicket.execute({
      memberId,
      name,
      number,
    });

    return ticket;
  }

  @Post('/validate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async validate(
    @ActiveMemberId() memberId: string,
    @Body() validateTicketDto: ValidateTicketDto,
  ) {
    const { id } = validateTicketDto;

    await this.validateTicket.execute({ ticketId: id, memberId });
  }

  @Delete('/:ticketId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @ActiveMemberId() memberId: string,
    @Param() { ticketId }: FindTicketByIdParams,
  ) {
    await this.deleteTicket.execute({ id: ticketId, memberId });
  }
}
