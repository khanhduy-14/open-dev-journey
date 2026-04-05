import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
}

@Entity()
export class UuidEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity()
export class IntEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
