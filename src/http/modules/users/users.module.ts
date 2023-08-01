import { Module } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../app/use-cases/users/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../../app/use-cases/users/get-user-by-id.use-case';
import { DatabaseModule } from '../../../database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [GetAllUsersUseCase, GetUserByIdUseCase],
  exports: [],
})
export class UsersModule {}
