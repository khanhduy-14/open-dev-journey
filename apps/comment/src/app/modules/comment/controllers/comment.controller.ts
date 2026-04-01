import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcp-logging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { Response } from '@common/interfaces/tcp/tcp.interface';
import { TCP_MESSAGE } from '@common/constants/tcp-message.constant';
import { CreateCommentRequestTcp } from '@common/interfaces/tcp/comment';
import { CommentService } from '../services/comment.service';
import { Comment } from '@common/schemas/comment.schema';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern(TCP_MESSAGE.COMMENT.CREATE)
  async getComments(@RequestParams() params: CreateCommentRequestTcp['data']) {
    const result = await this.commentService.create(params);
    return Response.success<Comment>(result);
  }
}
