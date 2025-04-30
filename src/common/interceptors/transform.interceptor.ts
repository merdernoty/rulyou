import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data === undefined) {
          return { success: true };
        }

        if (data && data.success !== undefined) {
          return data;
        }
        return {
          success: true,
          result: data,
        };
      }),
    );
  }
}
