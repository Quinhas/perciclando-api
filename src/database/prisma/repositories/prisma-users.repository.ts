import { Injectable } from '@nestjs/common';
import { User } from '../../../app/entities/user.entity';
import {
  UserCreateArgs,
  UserFindUniqueArgs,
  UsersRepository,
} from '../../../app/repositories/users.repository';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(args: UserFindUniqueArgs): Promise<User | null> {
    const { id, username } = args.where;

    const user = await this.prisma.user.findUnique({ where: { id, username } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create({ data }: UserCreateArgs): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(data);

    await this.prisma.user.create({ data: prismaUserData });
  }
}
