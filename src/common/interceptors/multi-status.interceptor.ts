import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { MultiStatusResponse } from '../responses/multi-status-response';

@Injectable()
export class MultiStatusInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data: T | MultiStatusResponse<T>) => {
        if (data instanceof MultiStatusResponse) {
          res.status(207);
          return data.data;
        }
        return data;
      }),
    );
  }
}
