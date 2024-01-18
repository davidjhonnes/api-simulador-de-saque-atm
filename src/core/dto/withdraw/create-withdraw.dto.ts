import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawDto {
  @ApiProperty({ default: 10, required: true })
  value: number;
  @ApiProperty({ default: '', required: true })
  atm: string;
}
