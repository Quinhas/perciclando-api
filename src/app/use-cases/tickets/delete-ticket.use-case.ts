import { HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { TicketsRepository } from '../../repositories/tickets.repository';

interface DeleteTicketUseCaseRequest {
  userId: string;
  id: string;
}

@Injectable()
export class DeleteTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}
  async execute({ id, userId }: DeleteTicketUseCaseRequest) {
    const ticket = await this.ticketsRepository.findFirst({
      where: { id },
    });

    if (!ticket) {
      throw new ApplicationException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'NOT_FOUND',
        message: 'Ingresso não encontrado.',
      });
    }

    if (ticket.createdById !== userId) {
      throw new ApplicationException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'FORBIDDEN',
        message: 'Ingresso criado por outro usuário.',
      });
    }

    if (ticket.validatedAt) {
      throw new ApplicationException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'FORBIDDEN',
        message: 'Ingresso com status VALIDADO.',
      });
    }

    await this.ticketsRepository.delete({ where: { id } });

    return ticket;
  }
}
