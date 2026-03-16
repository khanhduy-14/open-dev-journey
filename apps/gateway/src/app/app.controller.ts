import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/response.interface';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp.interface';
import { ProcessId } from '@common/decorators/process-id.decorator';

@Controller('gateway')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(TCP_SERVICES.BLOG_SERVICE) private readonly blogClient: TcpClient,
  ) {}

  @Get()
  getData() {
    throw new BadRequestException();
    const result = this.appService.getData();
    return new ResponseDto({ data: result });
  }

  @Get('blog')
  async getBlog(@ProcessId() processId: string) {
    return this.blogClient
      .send<string, Record<string, string | number>>('blog.get_blog', {
        processId,
        data: {
          blogId: 1,
          blogName: 'Hi',
        },
      })
      .pipe(map((data) => new ResponseDto<string>(data)));
  }
}
