import { HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { TicketsRepository } from '../../repositories/tickets.repository';

interface GetTicketByIdUseCaseRequest {
  id: string;
}

@Injectable()
export class GetTicketByIdUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}
  async execute({ id }: GetTicketByIdUseCaseRequest) {
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

    return ticket;
  }
}
