import { BadRequestException } from '@nestjs/common';
import GenericErrorDto from './generic-errors.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CastError, Error } from 'mongoose';

export default class CustomBadRequest extends BadRequestException {
  message: string;
  code: number = 400;
  errorobject: GenericErrorDto;
  error: any | ExceptionsHandler | Error | CastError;
  constructor(code: number, error, message?: string) {
    super();
    this.error = error;
    this.setError(code, message);
  }
  setError(code: number, message: string): void {
    const msg = message
      ? message
      : JSON.stringify(
          this.error.cause
            ? this.error.cause.friendlyMessage
            : this.error?.friendlyMessage
              ? this.error?.friendlyMessage
              : this.error.message,
        );
    this.message = msg;
    this.code = code;
    const errorobject: GenericErrorDto = new GenericErrorDto(
      this.code,
      JSON.stringify(this.message),
      this.error.stackTrace,
      message,
    );
    this.errorobject = errorobject;
  }

  getError(): BadRequestException {
    const e = new BadRequestException(this.error.parent, {
      cause: this.errorobject,
    });
    return e;
  }
}
