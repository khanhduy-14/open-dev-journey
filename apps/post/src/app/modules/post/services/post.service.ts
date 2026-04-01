import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { Post } from '@common/entites/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(data: Partial<Post>) {
    const { slug } = data;
    const exists = await this.postRepository.existsSlug(slug);
    if (exists) {
      throw new BadRequestException('Slug already exists');
    }
    return this.postRepository.create(data);
  }

  async findAll() {
    return this.postRepository.findAll();
  }
}
