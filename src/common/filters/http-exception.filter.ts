import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const responseMessage =
      typeof message === 'object' && message !== null && 'message' in message
        ? (message as any).message
        : message;

    let errorCode = 'INTERNAL_SERVER_ERROR';
    if (exception instanceof HttpException) {
      if (statusCode === 400) errorCode = 'BAD_REQUEST';
      else if (statusCode === 401) errorCode = 'UNAUTHORIZED';
      else if (statusCode === 403) errorCode = 'FORBIDDEN';
      else if (statusCode === 404) errorCode = 'NOT_FOUND';
      else errorCode = 'HTTP_ERROR';

      // Customize specific errors based on message or internal type if needed
      if (typeof responseMessage === 'string' && responseMessage === 'User already exists') {
         errorCode = 'USER_EXISTS';
      } else if (typeof responseMessage === 'string' && responseMessage === 'Invalid credentials') {
         errorCode = 'INVALID_CREDENTIALS';
      }
    }

    const errorResponse = {
      success: false,
      error: {
        code: errorCode,
        message: responseMessage,
      },
    };

    response.status(statusCode).json(errorResponse);
  }
}
