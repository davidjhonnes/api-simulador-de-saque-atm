import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ default: 100122, required: true })
  account: number;
  @ApiProperty({ default: 5, required: true })
  digit: number;
  @ApiProperty({ default: '123455', required: true })
  password: number;
}
