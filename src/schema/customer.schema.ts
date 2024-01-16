import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'Customers' })
export class Customer extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  dateBirthDay: Date;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  addressStreet: string;
  @Prop({ required: true })
  addressNumber: string;
  @Prop({ required: true })
  addressNeighborhood: string;
  @Prop({ required: true })
  addressComplement: string;
  @Prop({ required: true })
  addressCep: string;
  @Prop({ required: true })
  addressCity: string;
  @Prop({ required: true })
  addressUF: string;
  @Prop({ required: true })
  addressCountry: string;
  @Prop({ required: true, default: new Date() })
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
