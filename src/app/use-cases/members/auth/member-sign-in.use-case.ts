import { Inject, Injectable } from '@nestjs/common';

import { InjectionTokens } from '../../../../infra/config/injection-tokens';
import { IHttpStatus } from '../../../enums/http-status.enum';
import { ApplicationException } from '../../../exceptions/application-exception';
import { IMembersRepository } from '../../../repositories/members.repository';
import { IHashService } from '../../../services/hash/hash.service';
import { ITokenService } from '../../../services/token/token.service';

interface IMemberSignInRequest {
  username: string;
  password: string;
}

@Injectable()
export class MemberSignInUseCase {
  constructor(
    @Inject(InjectionTokens.MembersRepository)
    private readonly membersRepository: IMembersRepository,
    @Inject(InjectionTokens.HashService)
    private readonly hashService: IHashService,
    @Inject(InjectionTokens.TokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async execute({ username, password }: IMemberSignInRequest) {
    const user = await this.membersRepository.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ApplicationException({
        message: 'Credenciais inválidas.',
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApplicationException({
        message: 'Credenciais inválidas.',
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }

    const accessToken = this.tokenService.sign({ id: user.id });

    return { accessToken };
  }
}
