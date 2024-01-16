import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Atm extends Document {
  @Prop({ required: true, unique: true })
  serialCode: string;
  @Prop({ required: true, unique: true })
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
