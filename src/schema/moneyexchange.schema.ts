import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Atm } from './atm.schema';
import mongoose from 'mongoose';
@Schema()
export class MoneyExchangeAvaiable {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Atm', required: true })
  amtId: Atm;
  @Prop({ required: true })
  notes10: number;
  @Prop({ required: true })
  notes20: number;
  @Prop({ required: true })
  notes50: number;
  @Prop({ required: true })
  notes100: number;
  @Prop({ required: true })
  reloadDateAtm: Date;
  _createdAt: Date;
  _updatedAt: Date;
}
export const MoneyExchangeSchema = SchemaFactory.createForClass(
  MoneyExchangeAvaiable,
);
