import { Post } from '@common/entites/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(data: Partial<Post>) {
    const entity = this.postRepository.create(data);
    return this.postRepository.save(entity);
  }

  async findAll() {
    return this.postRepository.find();
  }

  async findOne(id: string) {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Post>) {
    return this.postRepository.update(id, data);
  }

  async delete(id: number) {
    return this.postRepository.delete(id);
  }

  async existsSlug(slug: string) {
    return this.postRepository.exists({ where: { slug } });
  }
}
