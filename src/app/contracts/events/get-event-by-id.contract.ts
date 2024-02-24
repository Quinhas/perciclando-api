import { z } from 'zod';

export const getEventByIdParamsSchema = z.object({
  id: z.string().uuid('ID do evento inválido.'),
});

export type GetEventByIdParams = z.infer<typeof getEventByIdParamsSchema>;
