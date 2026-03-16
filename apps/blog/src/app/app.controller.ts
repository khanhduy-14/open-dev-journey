import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcp-logging.interceptor';
import { Response, Request } from '@common/interfaces/tcp.interface';
import { ProcessId } from '@common/decorators/process-id.decorator';
import { RequestParams } from '@common/decorators/request-params.decorator';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('blog.get_blog')
  getBlog(
    @ProcessId() processId: string,
    @RequestParams() request: { blogId: number; blogName: string },
  ) {
    console.log('Blog', processId);
    return Response.success<string>(
      `Blog id: ${request.blogId} ${request.blogName}`,
    );
  }
}
