import { User } from './user.entity';

export interface Ticket {
  id: string;
  name: string;
  number: number;
  createdById: string;
  validatedById?: string;
  createdAt: Date;
  updatedAt?: Date;
  validatedAt?: Date;
  validatedBy?: User;
  createdBy?: User;
}
