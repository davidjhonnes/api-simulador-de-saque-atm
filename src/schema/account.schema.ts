import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import mongoose from 'mongoose';
@Schema()
export class Account {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    unique: true,
  })
  customer: Customer;
  @Prop({ required: true, unique: true })
  cardNumber: string;
  @Prop({ required: true, unique: true })
  accountNumber: number;
  @Prop({ required: true })
  accountNumberDigit: number;
  @Prop({ required: true, default: 0 })
  currentBalanceAccount: number;
  @Prop({ required: true })
  password: string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
