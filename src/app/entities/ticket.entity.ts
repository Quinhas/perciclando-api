export interface Ticket {
  id: string;
  name: string;
  number: number;
  createdBy: string;
  validatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  validatedAt?: Date;
}
