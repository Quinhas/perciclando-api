import { Inject, Injectable } from '@nestjs/common';

import { InjectionTokens } from '../../../infra/config/injection-tokens';
import { CreateMemberDto } from '../../contracts/members/create-member.contract';
import { IMember } from '../../entities/member.entity';
import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { IMembersRepository } from '../../repositories/members.repository';
import { IFileService } from '../../services/file/file.service';
import { IHashService } from '../../services/hash/hash.service';
import { generateUUID } from '../../utils/generateUUID';
import { Overwrite } from '../../utils/types';

type IExecute = Overwrite<
  CreateMemberDto,
  { photo?: Express.Multer.File | null }
>;

@Injectable()
export class CreateMemberUseCase {
  constructor(
    @Inject(InjectionTokens.MembersRepository)
    private readonly membersRepository: IMembersRepository,
    @Inject(InjectionTokens.HashService)
    private readonly hashService: IHashService,
    @Inject(InjectionTokens.FileService)
    private readonly fileService: IFileService,
  ) {}

  async execute({
    username,
    password,
    name,
    email,
    photo = null,
    isDisabled = false,
    roles = [],
  }: IExecute) {
    const usernameAlreadyInUse = await this.membersRepository.findUnique({
      where: { username },
    });

    if (usernameAlreadyInUse) {
      throw new ApplicationException({
        message: 'Nome de usuário já está em uso.',
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }
    const emailAlreadyInUse = await this.membersRepository.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new ApplicationException({
        message: 'E-mail já está em uso.',
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }

    const id = generateUUID();

    const hashedPassword = await this.hashService.hash(password);

    let photoUrl = null;
    if (photo) {
      photoUrl = await this.fileService.uploadFile(photo);
    }

    const member: IMember = {
      id,
      username,
      name,
      email,
      password: hashedPassword,
      photoUrl,
      isDisabled,
      roles,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.membersRepository.create({ data: member });

    return member;
  }
}
