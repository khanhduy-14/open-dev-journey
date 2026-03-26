import { Prop, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema, createSchema } from './base.schema';

@Schema({
  collection: 'comment',
})
export class Comment extends BaseSchema {
  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  authorId: string;

  @Prop({ type: String })
  postId: string;

  @Prop({ type: String, default: null })
  parentId: string | null;

  @Prop({ type: Number, default: 0 })
  likedCount: number;
}

export const CommentSchema = createSchema(Comment);
export const CommentModelName = Comment.name;
export const CommentDestination = {
  name: CommentModelName,
  schema: CommentSchema,
};

export type CommentModel = Model<Comment>;
