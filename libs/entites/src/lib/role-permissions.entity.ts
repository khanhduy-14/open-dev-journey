import { JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Entity } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('role_permissions')
export class RolePermissions extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  role: number;

  @PrimaryColumn({ type: 'int' })
  permissionId: number;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}
