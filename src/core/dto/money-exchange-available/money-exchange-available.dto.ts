import { ApiResponseProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Atm } from '../../../schema/atm.schema';
export class MoneyExchangeAvailableDto {
  @ApiResponseProperty()
  atm: Types.ObjectId | Atm | string;
  @ApiResponseProperty()
  registerCode: string;
  @ApiResponseProperty()
  notes10: number;
  @ApiResponseProperty()
  notes20: number;
  @ApiResponseProperty()
  notes50: number;
  @ApiResponseProperty()
  notes100: number;
  @ApiResponseProperty()
  reloadDateAtm: Date;
  @ApiResponseProperty()
  isActive: boolean;
}
