import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Account } from './account.schema';
import { Atm } from './atm.schema';

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;
  originTransaction: {
    type: string;
    enum: ['atm', 'transfer'];
  };
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Atm' })
  atm: Atm;
  @Prop()
  typeTransaction: {
    type: string;
    enum: ['credit', 'debit'];
  };
  @Prop()
  value: number;
  @Prop()
  balanceInCurrentLine: number;
  @Prop()
  dateTransaction: number;
  @Prop()
  isValid: boolean;
  _createdAt: Date;
  _updatedAt: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
