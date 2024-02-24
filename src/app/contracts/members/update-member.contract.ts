import { z } from 'zod';

import { createMemberDtoSchema } from './create-member.contract';

export const updateMemberParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type UpdateMemberParams = z.infer<typeof updateMemberParamsSchema>;

export const updateMemberDtoSchema = createMemberDtoSchema.partial();

export type UpdateMemberDto = z.infer<typeof updateMemberDtoSchema>;
