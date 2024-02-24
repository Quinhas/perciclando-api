import { z } from 'zod';

import { IMemberRole } from '../../enums/member-role.enum';

export const createMemberDtoSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(6).max(50),
  name: z.string().min(1).max(150),
  email: z.string().min(1).max(150).email(),
  isDisabled: z.coerce.boolean().optional(),
  photo: z
    .any()
    .refine((file) => {
      console.log(file);
      return true;
    }, 'O arquivo deve ser menor que 3MB.')
    .optional()
    .nullable(),
  roles: z.array(z.nativeEnum(IMemberRole)),
});

export type CreateMemberDto = z.infer<typeof createMemberDtoSchema>;
