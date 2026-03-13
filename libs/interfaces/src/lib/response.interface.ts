import { HttpStatus } from '@nestjs/common';
import { STATUS_CODES } from 'node:http';
import { ApiProperty } from '@nestjs/swagger';
export class ResponseDto<T> {
  @ApiProperty({ type: String })
  message: string = STATUS_CODES[HttpStatus.OK] ?? 'OK';

  @ApiProperty()
  data?: T;

  @ApiProperty({ type: String })
  processId?: string;

  @ApiProperty({ type: Number })
  statusCode: HttpStatus = HttpStatus.OK;

  @ApiProperty({ type: Number })
  duration?: number;

  constructor(data: Partial<ResponseDto<T>>) {
    Object.assign(this, data);
  }
}
