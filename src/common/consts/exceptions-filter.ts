import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { IErrorType } from '../utils/response.util';
import { ERROR_MESSAGES } from './error-messages';
import { StatusCode } from './http-code';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const path = request.url;
    const moduleName = this.detectModule(path);

    let status = StatusCode.SERVER_INTERNAL_ERROR;
    let message: string = ERROR_MESSAGES.INVALID_PAYLOAD;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      let exceptionMsg = '';
      if (typeof res === 'string') {
        exceptionMsg = res;
      } else if (
        typeof res === 'object' &&
        res !== null &&
        'message' in res &&
        typeof (res as Record<string, unknown>).message === 'string'
      ) {
        exceptionMsg = (res as Record<string, string>).message;
      }

      message = this.resolveMessage(moduleName, status, exceptionMsg);
    } else {
      message = ERROR_MESSAGES.INVALID_PAYLOAD;
    }

    const errResponse: IErrorType = {
      errorCode: status,
      errorMessage: message,
    };
    response.status(status).json(errResponse);
  }

  private detectModule(path: string): keyof typeof ERROR_MESSAGES | 'DEFAULT' {
    if (path.startsWith('/stores')) return 'STORES';
    if (path.startsWith('/feedbacks')) return 'FEEDBACKS';
    return 'DEFAULT';
  }

  private resolveMessage(
    moduleName: keyof typeof ERROR_MESSAGES | 'DEFAULT',
    status: number,
    exceptionMsg: string,
  ): string {
    let message: string = ERROR_MESSAGES.INVALID_PAYLOAD;

    switch (status) {
      case StatusCode.BAD_REQUEST:
        message = ERROR_MESSAGES.INVALID_PAYLOAD;
        break;

      case StatusCode.UNAUTHORIZED:
        message = ERROR_MESSAGES.INVALID_CREDENTIALS;
        break;

      case StatusCode.NOT_FOUND:
        switch (moduleName) {
          case 'STORES':
            message = ERROR_MESSAGES.STORES.STORE_NOTFOUND;
            break;
          case 'FEEDBACKS':
            message = ERROR_MESSAGES.FEEDBACKS.FEEDBACK_NOTFOUND;
            break;
        }
        break;

      case StatusCode.SERVER_INTERNAL_ERROR:
      default:
        switch (moduleName) {
          case 'FEEDBACKS':
            message = ERROR_MESSAGES.FEEDBACKS.CANNOT_CREATED;
            break;
        }
        break;
    }
    return exceptionMsg || message;
  }
}
