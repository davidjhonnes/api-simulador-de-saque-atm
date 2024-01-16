import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document, Types } from 'mongoose';
import { Atm } from './atm.schema';
@Schema({ collection: 'MoneyExchangeAvaiables' })
export class MoneyExchangeAvaiable extends Document {
  @Prop({
    index: true,
    type: SchemaTypes.ObjectId,
    ref: 'Atm',
    required: true,
  })
  atm: string | Types.ObjectId | Atm;
  @Prop({ required: true, unique: true })
  registerCode: string;
  @Prop({ required: true })
  notes10: number;
  @Prop({ required: true })
  notes20: number;
  @Prop({ required: true })
  notes50: number;
  @Prop({ required: true })
  notes100: number;
  @Prop({ required: true, default: new Date() })
  reloadDateAtm: Date;
  @Prop({ required: true, default: true })
  isActive: boolean;
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const MoneyExchangeSchema = SchemaFactory.createForClass(
  MoneyExchangeAvaiable,
);
