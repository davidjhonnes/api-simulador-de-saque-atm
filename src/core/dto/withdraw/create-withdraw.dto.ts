import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawDto {
  @ApiProperty({ default: 10, required: true })
  value: number;
  @ApiProperty({ default: '', required: true })
  atm: string;
  @ApiProperty({ default: 0, required: true })
  account: number;
  @ApiProperty({ default: 0, required: true })
  digitAccount: number;
}
