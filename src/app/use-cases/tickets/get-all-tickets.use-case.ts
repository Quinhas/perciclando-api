import { Inject, Injectable } from '@nestjs/common';

import { ITicketsRepository } from '../../repositories/tickets.repository';

@Injectable()
export class GetAllTicketsUseCase {
  constructor(
    @Inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  async execute() {
    const tickets = await this.ticketsRepository.findMany({});

    return tickets;
  }
}
