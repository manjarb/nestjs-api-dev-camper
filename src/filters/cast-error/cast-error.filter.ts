import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Observable } from 'rxjs';
import CastError = Error.CastError;

@Catch(CastError)
export class CastErrorFilter implements RpcExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      createdBy: 'CastErrorFilter',
      reason: exception.reason + '',
      value: exception.value,
    });
  }
}
