import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/tcp.interface';
import { ProcessId } from '@common/decorators/process-id.decorator';

@Controller('gateway')
export class AppController {}
