import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthenticatedDto {
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  accountNumber: number;
  @ApiResponseProperty()
  accountDigitNumber: number;
  @ApiResponseProperty()
  accessToken: string;
}
