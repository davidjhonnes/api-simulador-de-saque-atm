import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ default: 1000121, required: true })
  account: number;
  @ApiProperty({ default: 5, required: true })
  digit: number;
  @ApiProperty({
    default: 'ec7117851c0e5dbaad4effdb7cd17c050cea88cb',
    required: true,
  })
  password: string;
}
