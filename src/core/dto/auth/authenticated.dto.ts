import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthenticatedDto {
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  accessToken: string;
}
