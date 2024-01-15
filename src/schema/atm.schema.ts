import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Atm {
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
}
export const AtmSchema = SchemaFactory.createForClass(Atm);
