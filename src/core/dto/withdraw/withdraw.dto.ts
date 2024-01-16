import { ApiResponseProperty } from '@nestjs/swagger';
import { ResultWithDraw } from '../../../business-use-case/withdraw/interfaces/withdraw.interface';

export class WithdrawDto {
  @ApiResponseProperty()
  success: boolean;
  @ApiResponseProperty()
  idTransaction: string;
  @ApiResponseProperty()
  balanceCurrent: number;
  @ApiResponseProperty()
  resultWithDraw: ResultWithDraw;
}
