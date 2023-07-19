import { User as RawUser } from '@prisma/client';
import { User } from '../../../app/entities/user.entity';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return {
      id: raw.id,
      username: raw.username,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
