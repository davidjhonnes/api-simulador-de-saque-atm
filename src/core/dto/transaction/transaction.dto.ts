import { ApiResponseProperty } from '@nestjs/swagger';
import {
  OriginTransactionEnum,
  Transaction,
  TypeTransactionEnum,
} from '../../../schema/transaction.schema';
import { HydratedDocument } from 'mongoose';

export class TransactionDto {
  constructor(tr: HydratedDocument<Transaction>) {
    this.account = tr.account.toString();
    this.originTransaction = tr.originTransaction.toString();
    this.accountNumber = tr.accountNumber;
    this.atm = tr.atm.toString();
    this.typeTransaction = tr.typeTransaction.toString();
    this.value = tr.value;
    this.balanceInCurrentLine = tr.balanceInCurrentLine;
    this.dateTransaction = tr.dateTransaction;
    this.isValid = tr.isValid;
  }

  @ApiResponseProperty()
  account: string;
  @ApiResponseProperty()
  originTransaction: OriginTransactionEnum | string;
  @ApiResponseProperty()
  accountNumber: number;
  @ApiResponseProperty()
  atm: string;
  @ApiResponseProperty()
  typeTransaction: TypeTransactionEnum | string;
  @ApiResponseProperty()
  value: number;
  @ApiResponseProperty()
  balanceInCurrentLine: number;
  @ApiResponseProperty()
  dateTransaction: Date;
  @ApiResponseProperty()
  isValid: boolean;
}
