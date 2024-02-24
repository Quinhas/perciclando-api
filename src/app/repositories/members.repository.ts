import { IMember } from '@app/entities/member.entity';

type PKMember = {
  id: string;
};

type UniqueMember = {
  id: string;
  email: string;
  username: string;
};

export interface IMemberFindUniqueArgs {
  where: Partial<UniqueMember>;
}

export interface IMemberFindManyArgs {
  where?: Partial<IMember>;
}

export interface IMemberFindFirstArgs {
  where: Partial<IMember>;
}

export interface IMemberCreateArgs {
  data: IMember;
}

export interface IMemberUpdateArgs {
  where: PKMember;
  data: Partial<IMember>;
}

export interface IMembersRepository {
  findUnique(args: IMemberFindUniqueArgs): Promise<IMember | null>;

  findMany(args: IMemberFindManyArgs): Promise<IMember[]>;

  findFirst(params: IMemberFindFirstArgs): Promise<IMember | null>;

  create(args: IMemberCreateArgs): Promise<void>;

  update(args: IMemberUpdateArgs): Promise<void>;
}
