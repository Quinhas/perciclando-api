import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  CreateMemberDto,
  createMemberDtoSchema,
} from '../../../../app/contracts/members/create-member.contract';
import {
  UpdateMemberDto,
  updateMemberDtoSchema,
  UpdateMemberParams,
  updateMemberParamsSchema,
} from '../../../../app/contracts/members/update-member.contract';
import { CreateMemberUseCase } from '../../../../app/use-cases/members/create-member.use-case';
import { GetAllMembersUseCase } from '../../../../app/use-cases/members/get-all-members.use-case';
import { GetMemberByIdUseCase } from '../../../../app/use-cases/members/get-member-by-id.use-case';
import { UpdateMemberUseCase } from '../../../../app/use-cases/members/update-member.use-case';
import { ActiveMemberId } from '../../decorators/active-member-id.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

@Controller('members')
export class MembersController {
  constructor(
    private readonly getAllMembers: GetAllMembersUseCase,
    private readonly getMemberById: GetMemberByIdUseCase,
    private readonly createMember: CreateMemberUseCase,
    private readonly updateMember: UpdateMemberUseCase,
  ) {}

  @Get()
  async find() {
    const members = await this.getAllMembers.execute();

    return members;
  }

  @Get('/me')
  async me(@ActiveMemberId() memberId: string) {
    const member = await this.getMemberById.execute({ memberId });

    return member;
  }

  // @Get('/:ticketId')
  // async findById(@Param() { ticketId }: FindTicketByIdParams) {
  //   const ticket = await this.getTicketById.execute({
  //     id: ticketId,
  //   });

  //   return ticket;
  // }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body(new ZodValidationPipe(createMemberDtoSchema))
    createMemberDto: CreateMemberDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const { username, password, name, email, isDisabled, roles } =
      createMemberDto;

    const member = await this.createMember.execute({
      username,
      password,
      name,
      email,
      isDisabled,
      photo,
      roles,
    });

    return member;
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param(new ZodValidationPipe(updateMemberParamsSchema))
    updateMemberParams: UpdateMemberParams,
    @Body(new ZodValidationPipe(updateMemberDtoSchema))
    updateMemberDto: UpdateMemberDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const { id } = updateMemberParams;
    const {
      username,
      password,
      name,
      email,
      isDisabled,
      roles,
      photo: file,
    } = updateMemberDto;

    const member = await this.updateMember.execute({
      where: { id },
      data: {
        username,
        password,
        name,
        email,
        isDisabled,
        photo: file === 'null' ? null : photo,
        roles,
      },
    });

    return member;
  }
}
