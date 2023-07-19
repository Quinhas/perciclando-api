/* eslint-disable indent */
import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  NotEquals,
  validateSync,
} from 'class-validator';
import { env as environment } from 'process';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsNumber()
  @IsNotEmpty()
  port: number;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: environment.JWT_SECRET,
  port: Number(environment.PORT),
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
