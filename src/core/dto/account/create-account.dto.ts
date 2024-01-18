import { ApiProperty } from '@nestjs/swagger';
export class CreateAccountDto {
  @ApiProperty({ default: '', required: true })
  customer: string;
  @ApiProperty({ default: '1234567891234', required: true })
  cardNumber: string;
  @ApiProperty({ default: '1234567891234', required: true })
  cpf: string;
  @ApiProperty({ default: 100321, required: true })
  accountNumber: number;
  @ApiProperty({ default: 4, required: true })
  accountNumberDigit: number;
  @ApiProperty({ default: 10000.0, required: true })
  currentBalanceAccount: number;
  @ApiProperty({ default: '123456', required: true })
  password: string;
}
