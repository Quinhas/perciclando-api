import { Inject, Injectable } from '@nestjs/common';

import { IMember } from '../../entities/member.entity';
import { ApplicationException } from '../../exceptions/application-exception';
import { IMembersRepository } from '../../repositories/members.repository';

interface IGetMemberByIdUseCaseRequest {
  memberId: string;
}

@Injectable()
export class GetMemberByIdUseCase {
  constructor(
    @Inject('MembersRepository')
    private readonly membersRepository: IMembersRepository,
  ) {}

  async execute({ memberId }: IGetMemberByIdUseCaseRequest): Promise<IMember> {
    const member = await this.membersRepository.findFirst({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new ApplicationException({
        message: 'Integrante não encontrado.',
        statusCode: 404,
      });
    }

    return member;
  }
}
