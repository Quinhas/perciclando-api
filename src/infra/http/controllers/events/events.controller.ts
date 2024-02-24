import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateEventDto,
  createEventDtoSchema,
} from '@app/contracts/events/create-event.contract';
import {
  DeleteEventParams,
  deleteEventParamsSchema,
} from '@app/contracts/events/delete-event.contract';
import {
  GetEventByIdParams,
  getEventByIdParamsSchema,
} from '@app/contracts/events/get-event-by-id.contract';
import {
  UpdateEventDto,
  UpdateEventParams,
  updateEventDtoSchema,
  updateEventParamsSchema,
} from '@app/contracts/events/update-event.contract';
import { IHttpStatus } from '@app/enums/http-status.enum';
import { CreateEventUseCase } from '@app/use-cases/events/create-event.use-case';
import { DeleteEventUseCase } from '@app/use-cases/events/delete-event.use-case';
import { GetAllEventsUseCase } from '@app/use-cases/events/get-all-events.use-case';
import { GetEventByIdUseCase } from '@app/use-cases/events/get-event-by-id.use-case';
import { UpdateEventUseCase } from '@app/use-cases/events/update-event.use-case';

import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

@Controller('events')
export class EventsController {
  constructor(
    private readonly getAllEvents: GetAllEventsUseCase,
    private readonly getEventById: GetEventByIdUseCase,
    private readonly createEvent: CreateEventUseCase,
    private readonly updateEvent: UpdateEventUseCase,
    private readonly deleteEvent: DeleteEventUseCase,
  ) {}

  @Get()
  async find() {
    const events = await this.getAllEvents.execute();

    return events;
  }

  @Get('/:id')
  async findById(
    @Param(new ZodValidationPipe(getEventByIdParamsSchema))
    params: GetEventByIdParams,
  ) {
    const { id } = params;
    const member = await this.getEventById.execute({ id });

    return member;
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createEventDtoSchema))
    createEventDto: CreateEventDto,
  ) {
    const { name, date, description, isPublished, thumbnailUrl } =
      createEventDto;

    const event = await this.createEvent.execute({
      name,
      date,
      description,
      isPublished,
      thumbnailUrl,
    });

    return event;
  }

  @Patch(':id')
  async update(
    @Param(new ZodValidationPipe(updateEventParamsSchema))
    params: UpdateEventParams,
    @Body(new ZodValidationPipe(updateEventDtoSchema))
    updateEventDto: UpdateEventDto,
  ) {
    const { id } = params;
    const { name, date, description, isPublished, thumbnailUrl } =
      updateEventDto;

    const event = await this.updateEvent.execute({
      where: { id },
      data: { name, date, description, isPublished, thumbnailUrl },
    });

    return event;
  }

  @Delete(':id')
  @HttpCode(IHttpStatus.NO_CONTENT)
  async remove(
    @Param(new ZodValidationPipe(deleteEventParamsSchema))
    params: DeleteEventParams,
  ) {
    await this.deleteEvent.execute({ id: params.id });
  }
}
