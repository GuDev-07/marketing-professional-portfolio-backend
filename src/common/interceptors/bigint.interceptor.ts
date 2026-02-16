import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function serializeBigInt<T>(value: T): T {
  if (typeof value === 'bigint') {
    return value.toString() as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeBigInt(item)) as T;
  }

  if (value && typeof value === 'object') {
    if (value instanceof Date || value instanceof Buffer) {
      return value;
    }

    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, item]) => [key, serializeBigInt(item)],
    );

    return Object.fromEntries(entries) as T;
  }

  return value;
}

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => serializeBigInt(data)));
  }
}
