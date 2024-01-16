import { ApiResponseProperty } from '@nestjs/swagger';

export default class GenericErrorDto {
  constructor(
    errorCode?: number,
    message?: string,
    stackTrace?: string,
    friendlyMessage?: string,
  ) {
    this.errorCode = errorCode;
    this.message = message;
    this.stackTrace = stackTrace;
    this.friendlyMessage = friendlyMessage;
  }

  @ApiResponseProperty()
  errorCode?: number;
  @ApiResponseProperty()
  message?: string;
  @ApiResponseProperty()
  stackTrace?: string;
  @ApiResponseProperty()
  friendlyMessage?: string;
}
