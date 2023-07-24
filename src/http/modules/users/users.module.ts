import { Module } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../app/use-cases/users/get-all-users.use-case';
import { DatabaseModule } from '../../../database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [GetAllUsersUseCase],
  exports: [],
})
export class UsersModule {}
