export interface Ticket {
  id: string;
  name: string;
  number: number;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
