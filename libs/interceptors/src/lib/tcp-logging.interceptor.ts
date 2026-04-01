import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { STATUS_CODES } from 'http';
@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;

    const args = context.getArgs();
    const param = args[0];
    const processId = param.processId;

    Logger.log(
      `TCP >> Start process '${processId}' >> method: '${handlerName}' at '${now}' >> param: ${JSON.stringify(param)}`,
    );

    return next.handle().pipe(
      tap(() =>
        Logger.log(
          `TCP >> End process '${processId}' >> method: '${handlerName}' after: '${Date.now() - now}ms'`,
        ),
      ),
      catchError((err) => {
        Logger.log(
          `TCP >> Error process '${processId}': ${err.message} >> error: ${JSON.stringify(err)}  >> after: '${Date.now() - now}ms'`,
        );
        throw new RpcException({
          code:
            err?.status ||
            err?.code ||
            err?.error?.code ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.response?.message ||
            err?.message ||
            STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR],
        });
      }),
    );
  }
}
