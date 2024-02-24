import { Member, MemberRole } from '@prisma/client';

import { IMember } from '../../../../app/entities/member.entity';
import { IMemberRole } from '../../../../app/enums/member-role.enum';

export class PrismaMemberMapper {
  static toPrisma(member: IMember): Member {
    return {
      id: member.id,
      username: member.username,
      password: member.password,
      name: member.name,
      email: member.email,
      isDisabled: member.isDisabled,
      photoUrl: member.photoUrl,
      roles: member.roles as unknown as MemberRole[],
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    };
  }

  static toDomain(raw: Member): IMember {
    return {
      id: raw.id,
      username: raw.username,
      password: raw.password,
      name: raw.name,
      email: raw.email,
      isDisabled: raw.isDisabled,
      photoUrl: raw.photoUrl,
      roles: raw.roles as unknown as IMemberRole[],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
