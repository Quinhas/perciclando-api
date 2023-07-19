import { Ticket as RawTicket } from '@prisma/client';
import { Ticket } from '../../../app/entities/ticket.entity';

export class PrismaTicketsMapper {
  static toPrisma(ticket: Ticket) {
    return {
      id: ticket.id,
      name: ticket.name,
      number: ticket.number,
      createdBy: ticket.createdBy,
      validatedBy: ticket.validatedBy,
      validatedAt: ticket.validatedAt,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }

  static toDomain(raw: RawTicket): Ticket {
    return {
      id: raw.id,
      name: raw.name,
      number: raw.number,
      createdBy: raw.createdBy,
      validatedBy: raw.validatedBy ?? undefined,
      validatedAt: raw.validatedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
