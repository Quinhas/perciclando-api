import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodError, ZodObject } from 'zod';

import { IHttpStatus } from '@app/enums/http-status.enum';
import { ApplicationException } from '@app/exceptions/application-exception';

export class ZodValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private schema: ZodObject<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      const message =
        error instanceof ZodError && error.errors[0].message ?
          error.errors[0].message
        : 'Não foi possível validar as informações enviadas.';

      throw new ApplicationException({
        message,
        statusCode: IHttpStatus.BAD_REQUEST,
      });
    }
    return value;
  }
}
