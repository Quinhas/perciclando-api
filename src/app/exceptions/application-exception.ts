import { HttpException } from '@nestjs/common';

import { env } from '../../infra/config/env';
import { IHttpStatus } from '../enums/http-status.enum';

export class ApplicationException extends HttpException {
  constructor({
    message,
    statusCode = IHttpStatus.BAD_REQUEST,
    error,
  }: Perciclando.IApplicationException) {
    if (env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log({ message, statusCode, error });
    }

    super({ message, error }, statusCode);
  }
}
