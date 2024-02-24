import { Injectable } from '@nestjs/common';

import { IEvent } from '@app/entities/event.entity';
import {
  IEventCreateArgs,
  IEventDeleteArgs,
  IEventFindFirstArgs,
  IEventFindManyArgs,
  IEventFindUniqueArgs,
  IEventUpdateArgs,
  IEventsRepository,
} from '@app/repositories/events.repository';

import { PrismaEventMapper } from '../mappers/prisma-event.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEventsRepository implements IEventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique({ where }: IEventFindUniqueArgs): Promise<IEvent | null> {
    const { id, name } = where;

    const event = await this.prisma.event.findUnique({
      where: {
        id,
        name,
      },
    });

    if (!event) {
      return null;
    }

    return PrismaEventMapper.toDomain(event);
  }

  async findMany(args?: IEventFindManyArgs | undefined): Promise<IEvent[]> {
    const events = await this.prisma.event.findMany({ where: args?.where });

    return events.map(PrismaEventMapper.toDomain);
  }

  findFirst(params: IEventFindFirstArgs): Promise<IEvent | null> {
    throw new Error('Method not implemented.');
  }

  async create({ data }: IEventCreateArgs): Promise<void> {
    const prismaEventData = PrismaEventMapper.toPrisma(data);

    await this.prisma.event.create({ data: prismaEventData });
  }

  async update({ data, where }: IEventUpdateArgs): Promise<void> {
    const prismaEventData = PrismaEventMapper.toPrisma(data);

    await this.prisma.event.update({ where, data: prismaEventData });
  }

  async delete({ where }: IEventDeleteArgs): Promise<void> {
    await this.prisma.event.delete({ where });
  }
}
