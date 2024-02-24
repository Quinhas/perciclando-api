import { z } from 'zod';

export const deleteEventParamsSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteEventParams = z.infer<typeof deleteEventParamsSchema>;
