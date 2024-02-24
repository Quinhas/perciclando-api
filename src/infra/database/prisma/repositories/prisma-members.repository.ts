import { Injectable } from '@nestjs/common';

import { IMember } from '../../../../app/entities/member.entity';
import {
  IMemberCreateArgs,
  IMemberFindFirstArgs,
  IMemberFindUniqueArgs,
  IMemberUpdateArgs,
  IMembersRepository,
} from '../../../../app/repositories/members.repository';
import { PrismaMemberMapper } from '../mappers/prisma-member.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMembersRepository implements IMembersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(args: IMemberFindUniqueArgs): Promise<IMember | null> {
    const { id, username, email } = args.where;

    const member = await this.prisma.member.findUnique({
      where: { id, username, email },
    });

    if (!member) {
      return null;
    }

    return PrismaMemberMapper.toDomain(member);
  }

  async findMany(): Promise<IMember[]> {
    const users = await this.prisma.member.findMany();

    return users.map(PrismaMemberMapper.toDomain);
  }

  async findFirst(params: IMemberFindFirstArgs): Promise<IMember | null> {
    const { id, username, createdAt, updatedAt } = params.where;
    const member = await this.prisma.member.findFirst({
      where: { id, username, createdAt, updatedAt },
    });

    if (!member) {
      return null;
    }

    return PrismaMemberMapper.toDomain(member);
  }

  async create({ data }: IMemberCreateArgs): Promise<void> {
    const prismaMemberData = PrismaMemberMapper.toPrisma(data);

    await this.prisma.member.create({ data: prismaMemberData });
  }

  async update({ where, data }: IMemberUpdateArgs): Promise<void> {
    await this.prisma.member.update({ where, data });
  }
}
