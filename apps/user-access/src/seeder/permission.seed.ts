import { DataSource } from 'typeorm';
import { Permission } from '@common/entites/permission.entity';
import { Permission as PermissionEnum } from '@common/constants/auth.constants';
import { authSeedingLogger as logger } from '.';
export async function seedPermissions(dataSource: DataSource) {
  const repoPermission = dataSource.getRepository(Permission);
  const permissons = Object.values(PermissionEnum);

  for (const rule of permissons) {
    const exists = await repoPermission.findOne({ where: { rule } });

    if (!exists) {
      await repoPermission.insert({ rule });
    }
  }
  logger.log('Auth Database: Permissions seeded');
}
