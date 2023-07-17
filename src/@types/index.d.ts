import type { HttpStatus } from '@nestjs/common';

declare global {
  declare namespace Perciclando {
    declare interface ApplicationException {
      message: string;
      statusCode: HttpStatus;
      error: string;
    }
  }

  declare namespace Express {
    export interface Request {
      user?: {
        id: string;
      };
    }
  }
}
