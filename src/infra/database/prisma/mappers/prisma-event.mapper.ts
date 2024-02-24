import { Event } from '@prisma/client';

import { IEvent } from '@app/entities/event.entity';

export class PrismaEventMapper {
  static toPrisma(data: IEvent): Event {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      date: data.date,
      isPublished: data.isPublished,
      thumbnailUrl: data.thumbnailUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDomain(data: Event): IEvent {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      date: data.date,
      isPublished: data.isPublished,
      thumbnailUrl: data.thumbnailUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
