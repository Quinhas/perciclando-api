import { Inject, Injectable } from '@nestjs/common';

import { InjectionTokens } from '../../../infra/config/injection-tokens';
import { GetEventByIdParams } from '../../contracts/events/get-event-by-id.contract';
import { IEvent } from '../../entities/event.entity';
import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { IEventsRepository } from '../../repositories/events.repository';

@Injectable()
export class GetEventByIdUseCase {
  constructor(
    @Inject(InjectionTokens.EventsRepository)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async execute({ id }: GetEventByIdParams): Promise<IEvent> {
    const event = await this.eventsRepository.findUnique({ where: { id } });

    if (!event) {
      throw new ApplicationException({
        statusCode: IHttpStatus.NOT_FOUND,
        message: 'Evento não encontrado.',
      });
    }

    return event;
  }
}
