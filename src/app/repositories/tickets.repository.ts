import { ITicket } from '@app/entities/ticket.entity';

type PKTicket = {
  id: string;
};

export interface ITicketFindFirstArgs {
  where: Partial<ITicket>;
}

export interface ITicketFindManyArgs {
  where?: Partial<ITicket>;
}

export interface ITicketCreateArgs {
  data: ITicket;
}

export interface ITicketUpdateArgs {
  where: PKTicket;
  data: ITicket;
}

export interface ITicketDeleteArgs {
  where: Partial<ITicket>;
}

export interface ITicketsRepository {
  findFirst(args: ITicketFindFirstArgs): Promise<ITicket | null>;

  findMany(args: ITicketFindManyArgs): Promise<ITicket[]>;

  create(args: ITicketCreateArgs): Promise<void>;

  update(args: ITicketUpdateArgs): Promise<void>;

  delete(args: ITicketDeleteArgs): Promise<void>;
}
