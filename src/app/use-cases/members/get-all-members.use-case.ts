import { Inject, Injectable } from '@nestjs/common';

import { IMembersRepository } from '../../repositories/members.repository';

@Injectable()
export class GetAllMembersUseCase {
  constructor(
    @Inject('MembersRepository')
    private readonly membersRepository: IMembersRepository,
  ) {}

  async execute() {
    const members = await this.membersRepository.findMany({});

    return members;
  }
}
