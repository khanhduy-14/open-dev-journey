import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  type CommentModel,
  CommentModelName,
  Comment,
} from '@common/schemas/comment.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentModelName) private readonly commentModel: CommentModel,
  ) {}

  create(data: Partial<Comment>) {
    return this.commentModel.create(data);
  }

  getById(id: string) {
    return this.commentModel.findById(id);
  }

  updateById(id: string, data: Partial<Comment>) {
    return this.commentModel.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }
}
