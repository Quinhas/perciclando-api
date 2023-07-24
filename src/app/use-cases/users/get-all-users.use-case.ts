import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findMany({});

    return users;
  }
}
