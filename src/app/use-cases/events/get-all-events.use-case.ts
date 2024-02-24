import { Inject, Injectable } from '@nestjs/common';

import { InjectionTokens } from '../../../infra/config/injection-tokens';
import { IEvent } from '../../entities/event.entity';
import { IEventsRepository } from '../../repositories/events.repository';

@Injectable()
export class GetAllEventsUseCase {
  constructor(
    @Inject(InjectionTokens.EventsRepository)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async execute(): Promise<IEvent[]> {
    const events = await this.eventsRepository.findMany();

    return events;
  }
}
