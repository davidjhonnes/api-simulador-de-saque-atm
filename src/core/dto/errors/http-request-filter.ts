import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import GenericErrorDto from './generic-errors.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let json = {
      error: '',
      message: '',
      friendlyMsg: '',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    if (status === HttpStatus.UNAUTHORIZED) {
      json = {
        error: 'InvalidToken',
        statusCode: status,
        message: 'FORBIDEN',
        friendlyMsg: 'Acesso não autorizado',
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }
    if (status === HttpStatus.NOT_FOUND) {
      json = {
        error:
          error.cause instanceof GenericErrorDto
            ? error.cause.message
            : error.message,
        message: error.message,
        friendlyMsg:
          error.cause instanceof GenericErrorDto
            ? error.cause.friendlyMessage
            : error.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        json = {
          error:
            error.cause instanceof GenericErrorDto
              ? error.cause.message
              : error.message,
          message: error.message,
          friendlyMsg:
            error.cause instanceof GenericErrorDto
              ? error.cause.friendlyMessage
              : error.message,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else {
        json = {
          error:
            error.cause instanceof GenericErrorDto
              ? error.cause.message
              : error.message,
          message:
            error.cause instanceof GenericErrorDto
              ? error.cause.message
              : error.message,
          friendlyMsg:
            error.cause instanceof GenericErrorDto
              ? error.cause.friendlyMessage
              : error.message,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }
    }
    if (status === HttpStatus.BAD_REQUEST) {
      if (process.env.NODE_ENV === 'production') {
        json = {
          error:
            error.cause instanceof GenericErrorDto
              ? error.cause.message
              : error.message,
          message: error.message,
          friendlyMsg:
            error.cause instanceof GenericErrorDto
              ? error.cause.friendlyMessage
              : error.message,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else {
        json = {
          error:
            error.cause instanceof GenericErrorDto
              ? error.cause.message
              : error.message,
          message: error.message,
          friendlyMsg:
            error.cause instanceof GenericErrorDto
              ? error.cause.friendlyMessage
              : error.message,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }
    }
    console.error(json);

    response.status(status).json(json);
  }
}
