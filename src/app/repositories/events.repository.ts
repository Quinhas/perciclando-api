import { IEvent } from '@app/entities/event.entity';

type PKEvent = {
  id: string;
};

type UniqueEvent = {
  id: string;
  name: string;
};

export interface IEventFindUniqueArgs {
  where: Partial<UniqueEvent>;
}

export interface IEventFindManyArgs {
  where?: Partial<IEvent>;
}

export interface IEventFindFirstArgs {
  where: Partial<IEvent>;
}

export interface IEventCreateArgs {
  data: IEvent;
}

export interface IEventUpdateArgs {
  where: PKEvent;
  data: IEvent;
}

export interface IEventDeleteArgs {
  where: PKEvent;
}

export interface IEventsRepository {
  findUnique(args: IEventFindUniqueArgs): Promise<IEvent | null>;

  findMany(args?: IEventFindManyArgs): Promise<IEvent[]>;

  findFirst(params: IEventFindFirstArgs): Promise<IEvent | null>;

  create(args: IEventCreateArgs): Promise<void>;

  update(args: IEventUpdateArgs): Promise<void>;

  delete(args: IEventDeleteArgs): Promise<void>;
}
