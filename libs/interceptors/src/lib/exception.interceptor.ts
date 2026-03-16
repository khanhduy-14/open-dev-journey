import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { Request } from 'express';
import { RequestMetaDataEnum } from '@common/constants/common.constants';
import { ResponseDto } from '@common/interfaces/response.interface';
import { STATUS_CODES } from 'http';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<
      Request & {
        [RequestMetaDataEnum.PROCESS_ID]: string;
        [RequestMetaDataEnum.START_TIME]: number;
      }
    >();

    const processId = request[RequestMetaDataEnum.PROCESS_ID];
    const startTime = request[RequestMetaDataEnum.START_TIME];
    return next.handle().pipe(
      map((data: ResponseDto<unknown>) => {
        const duration = Date.now() - startTime;
        data.processId = processId;
        data.duration = duration;
        return data;
      }),
      catchError((error) => {
        this.logger.error({ error });
        const duration = Date.now() - startTime;
        const message =
          error?.response?.message ||
          error ||
          STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR];
        const code =
          error?.code ||
          error?.statusCode ||
          error?.response?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;
        throw new HttpException(
          new ResponseDto({
            data: null,
            message,
            statusCode: code,
            duration,
            processId,
          }),
          code,
        );
      }),
    );
  }
}
