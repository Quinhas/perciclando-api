import { Inject, Injectable } from '@nestjs/common';

import { InjectionTokens } from '../../../infra/config/injection-tokens';
import {
  UpdateMemberDto,
  UpdateMemberParams,
} from '../../contracts/members/update-member.contract';
import { IHttpStatus } from '../../enums/http-status.enum';
import { ApplicationException } from '../../exceptions/application-exception';
import { IMembersRepository } from '../../repositories/members.repository';
import { IFileService } from '../../services/file/file.service';
import { IHashService } from '../../services/hash/hash.service';
import { Overwrite } from '../../utils/types';

interface IExecute {
  where: UpdateMemberParams;
  data: Overwrite<UpdateMemberDto, { photo: Express.Multer.File | null }>;
}

@Injectable()
export class UpdateMemberUseCase {
  constructor(
    @Inject(InjectionTokens.MembersRepository)
    private readonly membersRepository: IMembersRepository,
    @Inject(InjectionTokens.HashService)
    private readonly hashService: IHashService,
    @Inject(InjectionTokens.FileService)
    private readonly fileService: IFileService,
  ) {}

  async execute({ where, data }: IExecute) {
    const { id } = where;
    const { username, password, name, email, photo, isDisabled, roles } = data;

    const member = await this.membersRepository.findUnique({ where: { id } });

    if (!member) {
      throw new ApplicationException({
        message: 'Integrante não encontrado.',
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }

    if (username && username !== member.username) {
      const usernameAlreadyInUse = await this.membersRepository.findUnique({
        where: { username },
      });

      if (usernameAlreadyInUse) {
        throw new ApplicationException({
          message: 'Nome de usuário já está em uso.',
          statusCode: IHttpStatus.BAD_REQUEST,
        });
      }

      member.username = username;
    }

    if (email && email !== member.email) {
      const emailAlreadyInUse = await this.membersRepository.findUnique({
        where: { email },
      });

      if (emailAlreadyInUse) {
        throw new ApplicationException({
          message: 'E-mail já está em uso.',
          statusCode: IHttpStatus.BAD_REQUEST,
        });
      }

      member.email = email;
    }

    if (name && name !== member.name) {
      member.name = name;
    }

    if (isDisabled !== undefined && isDisabled !== member.isDisabled) {
      member.isDisabled = isDisabled;
    }

    if (password) {
      const newPassword = await this.hashService.hash(password);
      member.password = newPassword;
    }

    if (photo !== undefined) {
      if (photo) {
        const newPhotoUrl = await this.fileService.uploadFile(photo);
        member.photoUrl = newPhotoUrl;
      } else {
        member.photoUrl = null;
      }
    }

    if (roles !== undefined) {
      member.roles = roles;
    }

    member.updatedAt = new Date();

    await this.membersRepository.update({
      where: { id: member.id },
      data: member,
    });

    return member;
  }
}
