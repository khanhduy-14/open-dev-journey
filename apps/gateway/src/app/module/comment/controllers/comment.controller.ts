import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ProcessId } from '@common/decorators/process-id.decorator';
import { TcpClient } from '@common/interfaces/tcp/tcp.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TCP_MESSAGE } from '@common/constants/tcp-message.constant';
import {
  CreateCommentRequestDto,
  CommentResponseDto,
} from '@common/interfaces/gateway/comment';
import {
  CommentResponseTcp,
  CreateCommentRequestTcp,
} from '@common/interfaces/tcp/comment';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { map } from 'rxjs';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(
    @Inject(TCP_SERVICES.COMMENT_SERVICE) readonly commentClient: TcpClient,
  ) {}
  @Post()
  @ApiOkResponse({ type: ResponseDto<CommentResponseDto> })
  @ApiOperation({ summary: 'Create comment' })
  createComment(@Body() data: CreateCommentRequestDto, @ProcessId() processId) {
    return this.commentClient
      .send<CommentResponseTcp, CreateCommentRequestTcp>(
        TCP_MESSAGE.COMMENT.CREATE,
        {
          data,
          processId,
        },
      )
      .pipe(map((data) => new ResponseDto(data)));
  }
}
