import { Injectable, Inject } from '@nestjs/common';

import { DeleteEventParams } from '@app/contracts/events/delete-event.contract';
import { IHttpStatus } from '@app/enums/http-status.enum';
import { ApplicationException } from '@app/exceptions/application-exception';
import { IEventsRepository } from '@app/repositories/events.repository';
import { InjectionTokens } from '@infra/config/injection-tokens';

@Injectable()
export class DeleteEventUseCase {
  constructor(
    @Inject(InjectionTokens.EventsRepository)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async execute({ id }: DeleteEventParams): Promise<void> {
    const event = await this.eventsRepository.findUnique({ where: { id } });

    if (!event) {
      throw new ApplicationException({
        statusCode: IHttpStatus.NOT_FOUND,
        message: 'Evento não encontrado.',
      });
    }

    await this.eventsRepository.delete({ where: { id } });
  }
}
