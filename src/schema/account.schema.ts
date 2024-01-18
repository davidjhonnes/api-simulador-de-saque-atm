import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'Accounts' })
export class Account extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSchema',
    required: true,
    unique: true,
  })
  customer: Customer;
  @Prop({ required: true, unique: true })
  cpf: string;
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
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
