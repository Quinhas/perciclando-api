import { Inject, Injectable } from '@nestjs/common';

import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { ITicketsRepository } from '../../repositories/tickets.repository';

interface IGetTicketByIdUseCaseRequest {
  id: string;
}

@Injectable()
export class GetTicketByIdUseCase {
  constructor(
    @Inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  async execute({ id }: IGetTicketByIdUseCaseRequest) {
    const ticket = await this.ticketsRepository.findFirst({
      where: { id },
    });

    if (!ticket) {
      throw new ApplicationException({
        statusCode: IHttpStatus.NOT_FOUND,
        message: 'Ingresso não encontrado.',
      });
    }

    return ticket;
  }
}
