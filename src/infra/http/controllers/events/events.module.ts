import { Module } from '@nestjs/common';

import { CreateEventUseCase } from '@app/use-cases/events/create-event.use-case';
import { DeleteEventUseCase } from '@app/use-cases/events/delete-event.use-case';
import { GetAllEventsUseCase } from '@app/use-cases/events/get-all-events.use-case';
import { GetEventByIdUseCase } from '@app/use-cases/events/get-event-by-id.use-case';
import { UpdateEventUseCase } from '@app/use-cases/events/update-event.use-case';

import { EventsController } from './events.controller';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [
    GetAllEventsUseCase,
    GetEventByIdUseCase,
    CreateEventUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
  ],
  exports: [],
})
export class EventsModule {}
