import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentTcpRequest } from '@common/interfaces/tcp/comment';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(params: CreateCommentTcpRequest['data']) {
    return this.commentRepository.create(params);
  }
}
