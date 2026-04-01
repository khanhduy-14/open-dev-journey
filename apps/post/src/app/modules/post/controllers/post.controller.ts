import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcp-logging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_MESSAGE } from '@common/constants/tcp-message.constant';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { CreatePostRequestTcp } from '@common/interfaces/tcp/post';
import { PostService } from '../services/post.service';
import { Response } from '@common/interfaces/tcp/tcp.interface';
import { Post } from '@common/entites/post.entity';
@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}
  @MessagePattern(TCP_MESSAGE.POST.CREATE)
  async createPost(@RequestParams() data: CreatePostRequestTcp['data']) {
    const result = await this.postService.create(data);
    return Response.success<Post>(result);
  }

  @MessagePattern(TCP_MESSAGE.POST.FIND_ALL)
  async findAll() {
    const result = await this.postService.findAll();
    return Response.success<Post[]>(result);
  }
}
