import { Injectable } from '@nestjs/common';
import { TokenService } from '../../../services/token/token.service';
import { CreateUserUseCase } from '../../users/create-user.use-case';

interface SignUpRequest {
  username: string;
  password: string;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly createUser: CreateUserUseCase,
  ) {}

  async execute({ username, password }: SignUpRequest) {
    const user = await this.createUser.execute({ username, password });

    const accessToken = this.tokenService.sign({ id: user.id });

    return { accessToken };
  }
}
