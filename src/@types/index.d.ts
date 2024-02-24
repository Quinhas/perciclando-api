import { IHttpStatus } from '../app/enums/http-status.enum';

declare global {
  declare namespace Perciclando {
    declare interface IApplicationException {
      message: string;
      statusCode?: IHttpStatus;
      error?: Record<string, unknown>;
    }
  }

  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      musician?: {
        id: string;
      };
    }
  }
}
