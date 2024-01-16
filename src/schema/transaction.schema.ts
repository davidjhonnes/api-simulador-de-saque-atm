import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Account } from './account.schema';
import { Atm } from './atm.schema';

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;
  @Prop({ required: true })
  originTransaction: {
    type: string;
    enum: ['atm', 'transfer'];
  };
  @Prop({ required: true })
  accountNumber: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Atm' })
  atm: Atm;
  @Prop({ required: true })
  typeTransaction: {
    type: string;
    enum: ['credit', 'debit'];
  };
  @Prop({ required: true })
  value: number;
  @Prop({ required: true })
  balanceInCurrentLine: number;
  @Prop({ required: true })
  dateTransaction: number;
  @Prop({ required: true })
  isValid: boolean;
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
