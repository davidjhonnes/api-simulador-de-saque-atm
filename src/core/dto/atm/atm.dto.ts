import { ApiResponseProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { MoneyExchangeAvaiable } from '../../../schema/moneyexchange.schema';
import { Types } from 'mongoose';
export class AtmDto {
  @ApiResponseProperty()
  _id?: string;
  @ApiResponseProperty()
  moneyAvailable: MoneyExchangeAvaiable | Types.ObjectId | string;
  @ApiResponseProperty()
  serialCode: string;
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  address: string;
  @ApiResponseProperty()
  cep: string;
  @ApiResponseProperty()
  city: string;
  @ApiResponseProperty()
  uf: string;
  @ApiResponseProperty()
  country: string;
  @ApiResponseProperty()
  isActive: boolean;
  @ApiResponseProperty()
  _createdAt: Date;
  @Prop({ required: true, default: new Date() })
  _updatedAt: Date;
}
