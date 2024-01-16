import { ApiProperty } from '@nestjs/swagger';

export class SingleResponseApiDto<T> {
  constructor(data: T, success: boolean, error: T) {
    this.data = data;
    this.success = success;
    this.error = error;
  }

  data: T;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  error: T;
}
