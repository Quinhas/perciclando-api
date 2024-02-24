import { Inject, Injectable } from '@nestjs/common';

import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { ITicketsRepository } from '../../repositories/tickets.repository';

interface IValidateTicketUseCaseRequest {
  memberId: string;
  ticketId: string;
}

@Injectable()
export class ValidateTicketUseCase {
  constructor(
    @Inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  async execute({ memberId, ticketId }: IValidateTicketUseCaseRequest) {
    const ticket = await this.ticketsRepository.findFirst({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new ApplicationException({
        statusCode: IHttpStatus.NOT_FOUND,
        message: 'Ingresso não encontrado.',
      });
    }

    if (ticket.validatedAt) {
      throw new ApplicationException({
        statusCode: IHttpStatus.FORBIDDEN,
        message: 'Ingresso já validado.',
      });
    }

    ticket.validatedAt = new Date();
    ticket.validatedById = memberId;

    await this.ticketsRepository.update({
      where: { id: ticketId },
      data: ticket,
    });

    return ticket;
  }
}
