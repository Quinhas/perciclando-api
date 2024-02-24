import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { IMember } from '../../../app/entities/member.entity';
import {
  ITokenPayload,
  ITokenService,
} from '../../../app/services/token/token.service';
import { env } from '../../config/env';

@Injectable()
export class JwtTokenServiceAdapter implements ITokenService {
  sign(member: IMember): string {
    return sign(
      {
        id: member.id,
      },
      env.JWT_SECRET,
      { expiresIn: '24h' },
    );
  }

  verify(token: string): ITokenPayload {
    return verify(token, env.JWT_SECRET) as unknown as ITokenPayload;
  }
}
