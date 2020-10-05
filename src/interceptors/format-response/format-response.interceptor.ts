import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('fff');
    return next.handle().pipe(
      map(data => {
        if (!data.data) {
          return {
            success: true,
            data,
          };
        }

        return {
          success: true,
          ...data,
        };
      }),
    );
  }
}
