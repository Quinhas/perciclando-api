import { IMember } from './member.entity';

export interface ITicket {
  id: string;
  name: string;
  number: number;
  createdById: string;
  validatedById?: string;
  createdAt: Date;
  updatedAt?: Date;
  validatedAt?: Date;
  validatedBy?: IMember;
  createdBy?: IMember;
}
