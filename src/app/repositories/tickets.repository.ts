import { Ticket } from '../entities/ticket.entity';

export interface TicketFindFirstArgs {
  where: Partial<Ticket>;
}

export interface TicketCreateArgs {
  data: Ticket;
}

export abstract class TicketsRepository {
  abstract findFirst(args: TicketFindFirstArgs): Promise<Ticket | null>;
  abstract create(args: TicketCreateArgs): Promise<void>;
}
