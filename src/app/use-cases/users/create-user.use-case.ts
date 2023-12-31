import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ApplicationException } from '../../../domain/exceptions/application-exception';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { PasswordService } from '../../services/password/password.service';

interface CreateUserUseCaseRequest {
  username: string;
  password: string;
  userId?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute({ username, password }: CreateUserUseCaseRequest) {
    const usernameAlreadyInUse = await this.usersRepository.findUnique({
      where: { username },
    });

    if (usernameAlreadyInUse) {
      throw new ApplicationException({
        message: 'Nome de usuário já está em uso.',
        statusCode: 400,
        error: 'BAD_REQUEST',
      });
    }

    const id = randomUUID();

    const hashedPassword = await this.passwordService.hashPassword(password);

    const user: User = {
      id,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await this.usersRepository.create({ data: user });

    return user;
  }
}
