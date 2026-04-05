import { Column } from 'typeorm';
import { UuidEntity } from './base.entity';
import { Entity } from 'typeorm';

@Entity()
export class Post extends UuidEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 255 })
  authorId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;
}
