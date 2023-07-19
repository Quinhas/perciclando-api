import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../../../domain/exceptions/application-exception';
import { UsersRepository } from '../../../repositories/users.repository';
import { PasswordService } from '../../../services/password/password.service';
import { TokenService } from '../../../services/token/token.service';

interface SignInRequest {
  username: string;
  password: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ username, password }: SignInRequest) {
    const user = await this.usersRepository.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ApplicationException({
        message: 'Invalid credentials.',
        statusCode: 400,
        error: 'BAD_REQUEST',
      });
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApplicationException({
        message: 'Invalid credentials.',
        statusCode: 400,
        error: 'BAD_REQUEST',
      });
    }

    const accessToken = this.tokenService.sign({ id: user.id });

    return { accessToken };
  }
}
