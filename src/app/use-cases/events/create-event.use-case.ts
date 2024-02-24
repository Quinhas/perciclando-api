import { Inject, Injectable } from '@nestjs/common';

import { CreateEventDto } from '@app/contracts/events/create-event.contract';
import { IEvent } from '@app/entities/event.entity';
import { ApplicationException } from '@app/exceptions/application-exception';
import { IEventsRepository } from '@app/repositories/events.repository';
import { generateUUID } from '@app/utils/generateUUID';
import { InjectionTokens } from '@infra/config/injection-tokens';

@Injectable()
export class CreateEventUseCase {
  constructor(
    @Inject(InjectionTokens.EventsRepository)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async execute({
    name,
    description,
    isPublished,
    date,
    thumbnailUrl,
  }: CreateEventDto): Promise<IEvent> {
    const nameIsAlreadyInUse = await this.eventsRepository.findUnique({
      where: { name },
    });

    if (nameIsAlreadyInUse) {
      throw new ApplicationException({
        message: 'Já existe um evento com esse nome.',
      });
    }

    const event: IEvent = {
      id: generateUUID(),
      name,
      description: description ?? null,
      date: date ? new Date(date) : null,
      isPublished: isPublished ?? false,
      thumbnailUrl: thumbnailUrl ?? null,
      updatedAt: null,
      createdAt: new Date(),
    };

    await this.eventsRepository.create({ data: event });

    return event;
  }
}
