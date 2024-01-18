import { ApiResponseProperty } from '@nestjs/swagger';
export class TransactionSearchDto {
  @ApiResponseProperty()
  page: number;
  @ApiResponseProperty()
  pageSize: number;
}
