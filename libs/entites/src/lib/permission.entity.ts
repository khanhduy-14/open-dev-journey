import { Column } from 'typeorm';
import { IntEntity } from './base.entity';
import { Entity } from 'typeorm';
import { Permission as PermissionEnum } from '@common/constants/auth.constants';

@Entity()
export class Permission extends IntEntity {
  @Column({ type: 'enum', enum: PermissionEnum, unique: true })
  rule: PermissionEnum;
}
