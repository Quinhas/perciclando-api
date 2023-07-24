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
      createdById: ticket.createdById,
      validatedById: ticket.validatedById,
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
      createdById: raw.createdBy,
      validatedById: raw.validatedBy ?? undefined,
      validatedAt: raw.validatedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      validatedBy:
        raw.userValidated && PrismaUserMapper.toDomain(raw.userValidated),
      createdBy: raw.user && PrismaUserMapper.toDomain(raw.user),
    };
  }
}
