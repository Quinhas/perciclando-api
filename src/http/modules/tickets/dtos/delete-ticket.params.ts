import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteTicketParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  ticketId: string;
}
