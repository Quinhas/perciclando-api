import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../../repositories/tickets.repository';

@Injectable()
export class GetAllTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute() {
    const tickets = await this.ticketsRepository.findMany({});

    return tickets;
  }
}
