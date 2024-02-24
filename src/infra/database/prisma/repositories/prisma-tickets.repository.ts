import { Injectable } from '@nestjs/common';

import { ITicket } from '../../../../app/entities/ticket.entity';
import {
  ITicketCreateArgs,
  ITicketDeleteArgs,
  ITicketFindFirstArgs,
  ITicketUpdateArgs,
  ITicketsRepository,
} from '../../../../app/repositories/tickets.repository';
import { PrismaTicketsMapper } from '../mappers/prisma-tickets.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTicketsRepository implements ITicketsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<ITicket[]> {
    const tickets = await this.prisma.ticket.findMany({
      include: { musicianValidated: true, musician: true },
    });

    return tickets.map(PrismaTicketsMapper.toDomain);
  }

  async findFirst(args: ITicketFindFirstArgs): Promise<ITicket | null> {
    const { id, name, number } = args.where;
    const ticket = await this.prisma.ticket.findFirst({
      where: { id, name, number },
    });

    if (!ticket) {
      return null;
    }

    return PrismaTicketsMapper.toDomain(ticket);
  }

  async create(args: ITicketCreateArgs): Promise<void> {
    const prismaTicketData = PrismaTicketsMapper.toPrisma(args.data);

    await this.prisma.ticket.create({ data: prismaTicketData });
  }

  async update(args: ITicketUpdateArgs): Promise<void> {
    const { id } = args.where;

    const prismaTicketData = PrismaTicketsMapper.toPrisma(args.data);

    await this.prisma.ticket.update({ where: { id }, data: prismaTicketData });
  }

  async delete(args: ITicketDeleteArgs): Promise<void> {
    const { id } = args.where;

    await this.prisma.ticket.delete({ where: { id } });
  }
}
