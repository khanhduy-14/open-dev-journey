import { DataSource } from 'typeorm';
import { Permission } from '@common/entites/permission.entity';
import { RolePermissions } from '@common/entites/role-permissions.entity';
import { ROLE_PERMISSIONS } from '@common/constants/auth.constants';
import { authSeedingLogger as logger } from '.';
export async function seedRolePermissions(dataSource: DataSource) {
  const rolePermRepo = dataSource.getRepository(RolePermissions);
  const permRepo = dataSource.getRepository(Permission);

  for (const [role, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    for (const rule of permissions) {
      const permission = await permRepo.findOne({
        where: { rule },
      });

      if (!permission) {
        throw new Error('Seeding role permissons got invalid permission ');
      }

      const exists = await rolePermRepo.findOne({
        where: {
          role: Number(role),
          permissionId: permission.id,
        },
      });

      if (!exists) {
        await rolePermRepo.insert({
          role: Number(role),
          permissionId: permission.id,
        });
      }
    }
  }

  logger.log('Auth Database: RolePermissions seeded');
}
