import { HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { STATUS_CODES } from 'node:http';

export class Request<T> {
  processId?: string;
  data?: T;

  constructor(data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}
export type RequestType<T> = Request<T>;

export class Response<T> {
  code: string;
  data?: T;
  error?: string;
  statusCode: number;

  constructor(data: Partial<Response<T>>) {
    this.code = data.code ?? (STATUS_CODES[HttpStatus.OK] as string);
    this.data = data.data;
    this.error = data.error;
    this.statusCode = data.statusCode ?? HttpStatus.OK;
  }

  static success<T>(data: T) {
    return new Response<T>({ data });
  }
}

export type ResponseType<T> = Response<T>;

export interface TcpClient {
  send<TResult = any, TInput = any>(
    pattern: any,
    data: RequestType<TInput>,
  ): Observable<ResponseType<TResult>>;

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: RequestType<TInput>,
  ): Observable<ResponseType<TResult>>;
}
