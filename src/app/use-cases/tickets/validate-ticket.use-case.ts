import { HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { TicketsRepository } from '../../repositories/tickets.repository';

interface ValidateTicketUseCaseRequest {
  userId: string;
  ticketId: string;
}

@Injectable()
export class ValidateTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({ userId, ticketId }: ValidateTicketUseCaseRequest) {
    const ticket = await this.ticketsRepository.findFirst({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new ApplicationException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Ingresso não encontrado.',
        error: 'NOT_FOUND',
      });
    }

    if (ticket.validatedBy) {
      throw new ApplicationException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Ingresso já validado.',
        error: 'FORBIDDEN',
      });
    }

    ticket.validatedAt = new Date();
    ticket.validatedBy = userId;

    await this.ticketsRepository.update({
      where: { id: ticketId },
      data: ticket,
    });

    return ticket;
  }
}
