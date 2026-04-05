import { TypeOrmProvider } from '@common/configuration/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissions } from '@common/entites/role-permissions.entity';
import { Permission } from '@common/entites/permission.entity';
@Module({
  imports: [
    TypeOrmProvider,
    TypeOrmModule.forFeature([RolePermissions, Permission]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleModule {}
