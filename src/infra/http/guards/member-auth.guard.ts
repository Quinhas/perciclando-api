import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';

import { ITokenService } from '../../../app/services/token/token.service';
import { env } from '../../config/env';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class MemberAuthGuard implements CanActivate {
  constructor(
    @Inject('TokenService')
    private tokenService: ITokenService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const isMasterKeyAccess = this.extractMasterKeyFromHeader(request);

    if (isMasterKeyAccess) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.tokenService.verify(token);

      request.memberId = payload.id;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractMasterKeyFromHeader(request: Request): boolean | undefined {
    const masterKey = request.headers?.['x-perciclando-access-key'];

    return masterKey === env.MASTER_KEY;
  }
}
