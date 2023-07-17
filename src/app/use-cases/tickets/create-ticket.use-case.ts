import { HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { Ticket } from '../../entities/ticket.entity';
import { TicketsRepository } from '../../repositories/tickets.repository';

interface CreateTicketUseCaseRequest {
  name: string;
  number: number;
}

@Injectable()
export class CreateTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}
  async execute({ name, number }: CreateTicketUseCaseRequest) {
    const ticketAlreadySold = await this.ticketsRepository.findFirst({
      where: { number },
    });

    if (ticketAlreadySold) {
      throw new ApplicationException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Ingresso já vendido.',
        error: 'CONFLICT',
      });
    }

    const ticket: Ticket = {
      id: randomUUID(),
      name,
      number,
      createdAt: new Date(),
    };

    await this.ticketsRepository.create({ data: ticket });

    return ticket;
  }
}
