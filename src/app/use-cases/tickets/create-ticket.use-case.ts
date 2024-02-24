import { randomUUID } from 'crypto';

import { Inject, Injectable } from '@nestjs/common';

import { ITicket } from '../../entities/ticket.entity';
import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { ITicketsRepository } from '../../repositories/tickets.repository';

interface ICreateTicketUseCaseRequest {
  memberId: string;
  name: string;
  number: number;
}

@Injectable()
export class CreateTicketUseCase {
  constructor(
    @Inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  async execute({ memberId, name, number }: ICreateTicketUseCaseRequest) {
    const ticketAlreadySold = await this.ticketsRepository.findFirst({
      where: { number },
    });

    if (ticketAlreadySold) {
      throw new ApplicationException({
        statusCode: IHttpStatus.CONFLICT,
        message: 'Ingresso já vendido.',
      });
    }

    const ticket: ITicket = {
      id: randomUUID(),
      name,
      number,
      createdById: memberId,
      createdAt: new Date(),
    };

    await this.ticketsRepository.create({ data: ticket });

    return ticket;
  }
}
