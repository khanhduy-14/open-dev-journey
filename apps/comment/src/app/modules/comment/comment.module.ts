import { MongoProvider } from '@common/configuration/mongo.config';
import { CommentDestination } from '@common/schemas/comment.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([CommentDestination])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
