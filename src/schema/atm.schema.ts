import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { MoneyExchangeAvaiable } from './moneyexchange.schema';
@Schema({ collection: 'Atms' })
export class Atm extends Document {
  @Prop({
    index: true,
    type: SchemaTypes.ObjectId,
    ref: 'MoneyExchangeAvaiable',
    required: true,
  })
  moneyAvailable: string | Types.ObjectId | MoneyExchangeAvaiable;
  @Prop({ required: true, unique: true })
  serialCode: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  cep: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  uf: string;
  @Prop({ default: 'BR' })
  country: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const AtmSchema = SchemaFactory.createForClass(Atm);
