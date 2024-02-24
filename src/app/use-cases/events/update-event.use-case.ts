import { Inject, Injectable } from '@nestjs/common';

import {
  UpdateEventDto,
  UpdateEventParams,
} from '@app/contracts/events/update-event.contract';

import { InjectionTokens } from '../../../infra/config/injection-tokens';
import { IEvent } from '../../entities/event.entity';
import { ApplicationException } from '../../exceptions/application-exception';
import { IEventsRepository } from '../../repositories/events.repository';

interface IExecute {
  where: UpdateEventParams;
  data: UpdateEventDto;
}

@Injectable()
export class UpdateEventUseCase {
  constructor(
    @Inject(InjectionTokens.EventsRepository)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async execute({ data, where }: IExecute): Promise<IEvent> {
    const { id } = where;
    const { name, date, description, isPublished, thumbnailUrl } = data;
    const event = await this.eventsRepository.findUnique({ where: { id } });

    if (!event) {
      throw new ApplicationException({
        message: 'Evento não encontrado.',
      });
    }

    if (name && name !== event.name) {
      const nameIsAlreadyInUse = await this.eventsRepository.findUnique({
        where: { name },
      });

      if (nameIsAlreadyInUse) {
        throw new ApplicationException({
          message: 'Já existe um evento com esse nome.',
        });
      }

      event.name = name;
    }

    if (date !== undefined && date !== event.date) {
      event.date = date;
    }

    if (description !== undefined && description !== event.description) {
      event.description = description;
    }

    if (isPublished !== undefined && isPublished !== event.isPublished) {
      event.isPublished = isPublished;
    }

    if (thumbnailUrl !== undefined && thumbnailUrl !== event.thumbnailUrl) {
      event.thumbnailUrl = thumbnailUrl;
    }

    event.updatedAt = new Date();

    await this.eventsRepository.update({ where: { id }, data: event });

    return event;
  }
}
