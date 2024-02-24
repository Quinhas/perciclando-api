import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateTicketDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
