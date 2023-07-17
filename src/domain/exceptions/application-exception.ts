import { HttpException } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor({
    statusCode,
    message,
    error,
  }: Perciclando.ApplicationException) {
    super({ message, error }, statusCode);
  }
}
