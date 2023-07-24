import { User } from '../entities/user.entity';

export interface UserFindUniqueArgs {
  where: Partial<User>;
}

export interface UserFindManyArgs {
  where?: Partial<User>;
}

export interface UserCreateArgs {
  data: User;
}

export abstract class UsersRepository {
  abstract findMany(args: UserFindManyArgs): Promise<User[]>;

  abstract findUnique(args: UserFindUniqueArgs): Promise<User | null>;

  abstract create(args: UserCreateArgs): Promise<void>;
}
