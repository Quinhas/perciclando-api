/* eslint-disable indent */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MemberSignInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
