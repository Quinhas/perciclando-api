import { Controller, Get } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../app/use-cases/users/get-all-users.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly getAllUsers: GetAllUsersUseCase) {}

  @Get()
  async find() {
    const users = await this.getAllUsers.execute();

    return users;
  }

  // @Get('/:ticketId')
  // async findById(@Param() { ticketId }: FindTicketByIdParams) {
  //   const ticket = await this.getTicketById.execute({
  //     id: ticketId,
  //   });

  //   return ticket;
  // }

  // @Post()
  // async create(
  //   @ActiveUserId() userId: string,
  //   @Body() createTicketDto: CreateTicketDto,
  // ) {
  //   const { name, number } = createTicketDto;

  //   const ticket = await this.createTicket.execute({
  //     userId,
  //     name,
  //     number,
  //   });

  //   return ticket;
  // }
}
