import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from './account.schema';
import { Atm } from './atm.schema';

export enum OriginTransactionEnum {
  atm = 'atm',
  transfer = 'transfer',
}

export enum TypeTransactionEnum {
  credit = 'credit',
  debit = 'debit',
}
@Schema({ collection: 'Transactions' })
export class Transaction extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;
  @Prop({ type: String, required: true })
  originTransaction: {
    enum: OriginTransactionEnum;
  };
  @Prop({ required: true })
  accountNumber: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Atm' })
  atm: Atm | string;
  @Prop({ type: String, required: true })
  typeTransaction: {
    enum: TypeTransactionEnum;
  };
  @Prop({ required: true })
  value: number;
  @Prop({ required: true })
  balanceInCurrentLine: number;
  @Prop({ required: true })
  dateTransaction: Date;
  @Prop({ required: true })
  isValid: boolean;
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
