import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveMemberId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { memberId } = request;

    if (!memberId) {
      throw new UnauthorizedException();
    }

    return memberId;
  },
);
