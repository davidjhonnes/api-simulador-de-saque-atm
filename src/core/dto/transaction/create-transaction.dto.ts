import { ApiProperty } from '@nestjs/swagger';
import {
  OriginTransactionEnum,
  TypeTransactionEnum,
} from '../../../schema/transaction.schema';

export class CreateTransactionDto {
  @ApiProperty({ default: 10, required: true })
  account: string;
  @ApiProperty({ default: 'atm', required: true })
  originTransaction: OriginTransactionEnum;
  @ApiProperty({ default: 10, required: true })
  accountNumber: number;
  @ApiProperty({ default: '', required: true })
  atm: string;
  @ApiProperty({ default: 'debit', required: true })
  typeTransaction: TypeTransactionEnum;
  @ApiProperty({ default: 10, required: true })
  value: number;
  @ApiProperty({ default: 10, required: true })
  balanceInCurrentLine: number;
  @ApiProperty({ default: new Date(), required: true })
  dateTransaction: Date;
  @ApiProperty({ default: true, required: false })
  isValid: boolean;
}
