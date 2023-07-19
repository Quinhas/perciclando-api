import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtTokenServiceAdapter } from './adapters/token/jwt-token-service.adapter';
import { AppController } from './app.controller';
import { TokenService } from './app/services/token/token.service';
import { AuthGuard } from './http/guards/auth.guard';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: TokenService,
      useClass: JwtTokenServiceAdapter,
    },
  ],
})
export class AppModule {}
