import { Ticket } from '../entities/ticket.entity';

interface PKTicket {
  id: string;
}

export interface TicketFindFirstArgs {
  where: Partial<Ticket>;
}

export interface TicketFindManyArgs {
  where?: Partial<Ticket>;
}

export interface TicketCreateArgs {
  data: Ticket;
}

export interface TicketUpdateArgs {
  where: PKTicket;
  data: Ticket;
}

export abstract class TicketsRepository {
  abstract findFirst(args: TicketFindFirstArgs): Promise<Ticket | null>;
  abstract findMany(args: TicketFindManyArgs): Promise<Ticket[]>;
  abstract create(args: TicketCreateArgs): Promise<void>;
  abstract update(args: TicketUpdateArgs): Promise<void>;
}
