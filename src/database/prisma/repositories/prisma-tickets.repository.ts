import { Injectable } from '@nestjs/common';
import { Ticket } from '../../../app/entities/ticket.entity';
import {
  TicketCreateArgs,
  TicketFindFirstArgs,
  TicketFindManyArgs,
  TicketUpdateArgs,
  TicketsRepository,
} from '../../../app/repositories/tickets.repository';
import { PrismaTicketsMapper } from '../mappers/prisma-tickets.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTicketsRepository implements TicketsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(args: TicketFindManyArgs): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      include: { userValidated: true, user: true },
    });

    return tickets.map(PrismaTicketsMapper.toDomain);
  }

  async findFirst(args: TicketFindFirstArgs): Promise<Ticket | null> {
    const { id, name, number } = args.where;
    const ticket = await this.prisma.ticket.findFirst({
      where: { id, name, number },
    });

    if (!ticket) {
      return null;
    }

    return PrismaTicketsMapper.toDomain(ticket);
  }

  async create(args: TicketCreateArgs): Promise<void> {
    const prismaTicketData = PrismaTicketsMapper.toPrisma(args.data);

    await this.prisma.ticket.create({ data: prismaTicketData });
  }

  async update(args: TicketUpdateArgs): Promise<void> {
    const { id } = args.where;

    const prismaTicketData = PrismaTicketsMapper.toPrisma(args.data);

    await this.prisma.ticket.update({ where: { id }, data: prismaTicketData });
  }
}
