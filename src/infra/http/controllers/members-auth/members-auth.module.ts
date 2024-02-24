import { Module } from '@nestjs/common';

import { MemberSignInUseCase } from '../../../../app/use-cases/members/auth/member-sign-in.use-case';
import { CreateMemberUseCase } from '../../../../app/use-cases/members/create-member.use-case';
import { S3FileService } from '../../../adapters/file/s3-file.service';
import { BcryptHashServiceAdapter } from '../../../adapters/hash/bcrypt-hash-service.adapter';
import { JwtTokenServiceAdapter } from '../../../adapters/token/jwt-token-service.adapter';
import { InjectionTokens } from '../../../config/injection-tokens';

import { MembersAuthController } from './members-auth.controller';

@Module({
  imports: [],
  controllers: [MembersAuthController],
  providers: [
    MemberSignInUseCase,
    CreateMemberUseCase,
    {
      provide: InjectionTokens.HashService,
      useClass: BcryptHashServiceAdapter,
    },
    { provide: InjectionTokens.TokenService, useClass: JwtTokenServiceAdapter },
    { provide: InjectionTokens.FileService, useClass: S3FileService },
  ],
})
export class MembersAuthModule {}
