import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { ApiResponse } from '../responses/api-response';

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,

    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      const exceptionResponse =
        exception.getResponse();

      if (
        typeof exceptionResponse ===
        'object'
      ) {
        const r =
          exceptionResponse as any;

        message =
          r.message || message;
      } else {
        message =
          exceptionResponse as string;
      }
    }

    response.status(status).json(
      ApiResponse.error(
        Array.isArray(message)
          ? message.join(', ')
          : message,
        status,
      ),
    );
  }
}