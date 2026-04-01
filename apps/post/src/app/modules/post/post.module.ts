import { TypeOrmProvider } from '@common/configuration/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@common/entites/post.entity';
import { PostController } from './controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmProvider, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
