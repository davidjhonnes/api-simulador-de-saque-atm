import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthValidtokenDto {
  @ApiResponseProperty()
  isTokenValid: boolean;
}
