import { Inject, Injectable } from '@nestjs/common';

import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { ITicketsRepository } from '../../repositories/tickets.repository';

interface IDeleteTicketUseCaseRequest {
  memberId: string;
  id: string;
}

@Injectable()
export class DeleteTicketUseCase {
  constructor(
    @Inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  async execute({ id, memberId }: IDeleteTicketUseCaseRequest) {
    const ticket = await this.ticketsRepository.findFirst({
      where: { id },
    });

    if (!ticket) {
      throw new ApplicationException({
        statusCode: IHttpStatus.NOT_FOUND,
        message: 'Ingresso não encontrado.',
      });
    }

    if (ticket.createdById !== memberId) {
      throw new ApplicationException({
        statusCode: IHttpStatus.FORBIDDEN,
        message: 'Ingresso criado por outro usuário.',
      });
    }

    if (ticket.validatedAt) {
      throw new ApplicationException({
        statusCode: IHttpStatus.FORBIDDEN,
        message: 'Ingresso com status VALIDADO.',
      });
    }

    await this.ticketsRepository.delete({ where: { id } });

    return ticket;
  }
}
