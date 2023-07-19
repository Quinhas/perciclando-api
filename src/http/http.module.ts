import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [AuthModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
