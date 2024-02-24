import { z } from 'zod';

import { createEventDtoSchema } from './create-event.contract';

export const updateEventDtoSchema = createEventDtoSchema.partial();

export type UpdateEventDto = z.infer<typeof updateEventDtoSchema>;

export const updateEventParamsSchema = z.object({
  id: z.string().uuid('ID do evento inválido.'),
});

export type UpdateEventParams = z.infer<typeof updateEventParamsSchema>;
