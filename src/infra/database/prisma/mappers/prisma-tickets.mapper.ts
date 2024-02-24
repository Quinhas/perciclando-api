import { Member, Ticket as RawTicket } from '@prisma/client';

import { ITicket } from '../../../../app/entities/ticket.entity';

import { PrismaMemberMapper } from './prisma-member.mapper';

type PrismaTicket = RawTicket & {
  musicianValidated?: Member | null;
  musician?: Member;
};

export class PrismaTicketsMapper {
  static toPrisma(ticket: ITicket) {
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

  static toDomain(raw: PrismaTicket): ITicket {
    return {
      id: raw.id,
      name: raw.name,
      number: raw.number,
      createdById: raw.createdById,
      validatedById: raw.validatedById ?? undefined,
      validatedAt: raw.validatedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      validatedBy:
        raw.musicianValidated ?
          PrismaMemberMapper.toDomain(raw.musicianValidated)
        : undefined,
      createdBy: raw.musician && PrismaMemberMapper.toDomain(raw.musician),
    };
  }
}
