import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../../repositories/users.repository';

interface GetUserByIdUseCaseRequest {
  userId: string;
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserByIdUseCaseRequest): Promise<User> {
    const user = await this.usersRepository.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApplicationException({
        message: 'Usuário não encontrado.',
        statusCode: 404,
        error: 'NOT_FOUND',
      });
    }

    return user;
  }
}
