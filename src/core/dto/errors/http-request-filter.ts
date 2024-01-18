import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
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

    const msg =
      error.cause instanceof GenericErrorDto
        ? error.cause.message?.replace(/["\\]/g, '')
        : error?.cause
          ? error?.cause['message']?.replace(/["\\]/g, '')
          : error.message?.replace(/["\\]/g, '');

    const friendly =
      error.cause instanceof GenericErrorDto
        ? error.cause.friendlyMessage?.replace(/["\\]/g, '')
        : error?.cause
          ? error?.cause['friendlyMessage']?.replace(/["\\]/g, '')
          : error.message?.replace(/["\\]/g, '');

    let json = {
      error: msg,
      message: msg,
      friendlyMessage: friendly,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    if (status === HttpStatus.UNAUTHORIZED) {
      json = {
        error: 'InvalidToken',
        statusCode: status,
        message: 'FORBIDEN',
        friendlyMessage: 'Acesso não autorizado',
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }
    if (status === HttpStatus.NOT_FOUND) {
      json = {
        error: 'NOT FOUND',
        message: msg,
        friendlyMessage: friendly,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        json = {
          error: 'INTERNAL SERVER ERROR',
          message: msg,
          friendlyMessage: friendly,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else {
        json = {
          error: msg,
          message: msg,
          friendlyMessage: friendly,
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
