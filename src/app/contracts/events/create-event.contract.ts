import { z } from 'zod';

export const createEventDtoSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(1, 'O nome é obrigatório.')
    .max(150, 'O nome não pode ultrapassar 150 caracteres.'),
  description: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  thumbnailUrl: z.string().optional().nullable(),
  isPublished: z.coerce.boolean().optional(),
});

export type CreateEventDto = z.infer<typeof createEventDtoSchema>;
