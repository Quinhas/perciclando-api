import { Module } from '@nestjs/common';

import { CreateMemberUseCase } from '../../../../app/use-cases/members/create-member.use-case';
import { GetAllMembersUseCase } from '../../../../app/use-cases/members/get-all-members.use-case';
import { GetMemberByIdUseCase } from '../../../../app/use-cases/members/get-member-by-id.use-case';
import { UpdateMemberUseCase } from '../../../../app/use-cases/members/update-member.use-case';
import { S3FileService } from '../../../adapters/file/s3-file.service';
import { BcryptHashServiceAdapter } from '../../../adapters/hash/bcrypt-hash-service.adapter';
import { InjectionTokens } from '../../../config/injection-tokens';

import { MembersController } from './members.controller';

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [
    GetAllMembersUseCase,
    GetMemberByIdUseCase,
    CreateMemberUseCase,
    UpdateMemberUseCase,
    {
      provide: InjectionTokens.HashService,
      useClass: BcryptHashServiceAdapter,
    },
    { provide: InjectionTokens.FileService, useClass: S3FileService },
  ],
  exports: [],
})
export class MembersModule {}
