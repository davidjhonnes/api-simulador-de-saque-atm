import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ default: '80906698081', required: true })
  cpf: string;
  @ApiProperty({
    default: '123456',
    required: true,
  })
  password: string;
}
