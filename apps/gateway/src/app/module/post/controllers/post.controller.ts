import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostRequestDto } from '@common/interfaces/gateway/post/post-request.dto';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/tcp.interface';
import { ProcessId } from '@common/decorators/process-id.decorator';
import {
  PostResponseTcp,
  CreatePostRequestTcp,
} from '@common/interfaces/tcp/post';
import { TCP_MESSAGE } from '@common/constants/tcp-message.constant';
import { map } from 'rxjs';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    @Inject(TCP_SERVICES.POST_SERVICE) private readonly postClient: TcpClient,
  ) {}

  @Post()
  create(@Body() data: CreatePostRequestDto, @ProcessId() processId) {
    return this.postClient
      .send<PostResponseTcp, CreatePostRequestTcp>(TCP_MESSAGE.POST.CREATE, {
        data,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get()
  findAll(@ProcessId() processId) {
    return this.postClient
      .send(TCP_MESSAGE.POST.FIND_ALL, { processId })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
