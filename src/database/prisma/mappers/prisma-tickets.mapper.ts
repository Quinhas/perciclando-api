import { Ticket as RawTicket, User } from '@prisma/client';
import { Ticket } from '../../../app/entities/ticket.entity';
import { PrismaUserMapper } from './prisma-user.mapper';

type PrismaTicket = RawTicket & {
  userValidated?: User;
  user?: User;
};

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

  static toDomain(raw: any): Ticket {
    return {
      id: raw.id,
      name: raw.name,
      number: raw.number,
      createdBy: raw.createdBy,
      validatedBy: raw.validatedBy ?? undefined,
      validatedAt: raw.validatedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      userValidated:
        raw.userValidated && PrismaUserMapper.toDomain(raw.userValidated),
      createdByUser: raw.user && PrismaUserMapper.toDomain(raw.user),
    };
  }
}
