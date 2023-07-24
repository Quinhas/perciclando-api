import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, TicketsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
