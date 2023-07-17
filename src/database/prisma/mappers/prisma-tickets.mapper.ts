import { Ticket as RawTicket } from '@prisma/client';
import { Ticket } from '../../../app/entities/ticket.entity';

export class PrismaTicketsMapper {
  static toPrisma(ticket: Ticket) {
    return {
      id: ticket.id,
      name: ticket.name,
      number: ticket.number,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }

  static toDomain(raw: RawTicket): Ticket {
    return {
      id: raw.id,
      name: raw.name,
      number: raw.number,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
