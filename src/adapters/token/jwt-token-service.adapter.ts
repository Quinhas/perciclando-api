import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../../app/entities/user.entity';
import {
  TokenPayload,
  TokenService,
} from '../../app/services/token/token.service';
import { env } from '../../config/env';

@Injectable()
export class JwtTokenServiceAdapter implements TokenService {
  sign(user: User): string {
    return sign(
      {
        id: user.id,
      },
      env.jwtSecret,
      { expiresIn: '24h' },
    );
  }

  verify(token: string): TokenPayload {
    return verify(token, env.jwtSecret) as unknown as TokenPayload;
  }
}
