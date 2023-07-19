import { Module } from '@nestjs/common';
import { BcryptPasswordServiceAdapter } from '../../../adapters/password/bcrypt-password-service.adapter';
import { JwtTokenServiceAdapter } from '../../../adapters/token/jwt-token-service.adapter';
import { PasswordService } from '../../../app/services/password/password.service';
import { TokenService } from '../../../app/services/token/token.service';
import { SignInUseCase } from '../../../app/use-cases/auth/sign-in/sign-in.use-case';
import { SignUpUseCase } from '../../../app/use-cases/auth/sign-up/sign-up.use-case';
import { DatabaseModule } from '../../../database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    { provide: PasswordService, useClass: BcryptPasswordServiceAdapter },
    { provide: TokenService, useClass: JwtTokenServiceAdapter },
  ],
})
export class AuthModule {}
