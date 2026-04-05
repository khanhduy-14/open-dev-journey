import { RolePermissions } from '@common/entites/role-permissions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RolePermissions)
    private readonly rolePermissionsRepository: Repository<RolePermissions>,
  ) {}
  async getPermissionsByRoleId(role: number): Promise<string[]> {
    const rolePerms = await this.rolePermissionsRepository.find({
      where: { role },
      relations: ['permission'],
    });

    return rolePerms.map((rp) => `${rp.permission.rule}`);
  }
}
