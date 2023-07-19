import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from '../../../app/use-cases/auth/sign-in/sign-in.use-case';
import { SignUpUseCase } from '../../../app/use-cases/auth/sign-up/sign-up.use-case';
import { IsPublic } from '../../decorators/is-public.decorator';
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(
    private readonly signIn: SignInUseCase,
    private readonly signUp: SignUpUseCase,
  ) {}

  @Post('signin')
  async signin(@Body() signinDto: SignInDto) {
    const { username, password } = signinDto;
    const { accessToken } = await this.signIn.execute({
      username,
      password,
    });
    return {
      access_token: accessToken,
    };
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const { username, password } = signupDto;
    const { accessToken } = await this.signUp.execute({
      username,
      password,
    });
    return {
      access_token: accessToken,
    };
  }
}
