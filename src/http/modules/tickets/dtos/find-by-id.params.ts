import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindTicketByIdParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  ticketId: string;
}
