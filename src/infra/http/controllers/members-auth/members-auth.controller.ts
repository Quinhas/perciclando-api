import { Body, Controller, Post } from '@nestjs/common';

import { MemberSignInUseCase } from '../../../../app/use-cases/members/auth/member-sign-in.use-case';
import { IsPublic } from '../../decorators/is-public.decorator';

import { MemberSignInDto } from './dtos/member-signin.dto';

@Controller('members/auth')
@IsPublic()
export class MembersAuthController {
  constructor(private readonly memberSignIn: MemberSignInUseCase) {}

  @Post('sign-in')
  async signin(@Body() signinDto: MemberSignInDto) {
    const { username, password } = signinDto;
    const { accessToken } = await this.memberSignIn.execute({
      username,
      password,
    });
    return {
      accessToken,
    };
  }
}
