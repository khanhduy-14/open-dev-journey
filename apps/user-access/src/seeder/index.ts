import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { seedPermissions } from './permission.seed';
import { seedRolePermissions } from './role-permissions.seed';
import { AppModule } from '../app/app.module';

const logger = new Logger('UserAccess - SeedRunner');
export { logger as authSeedingLogger };
async function runSeeds() {
  logger.log('Starting seed process...');

  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const dataSource = app.get<DataSource>(DataSource);

    logger.log('Database connected');
    await dataSource.transaction(async (manager) => {
      logger.log('Seeding permissions...');
      await seedPermissions(manager.connection);

      logger.log('Seeding role-permissions...');
      await seedRolePermissions(manager.connection);
    });

    logger.log('Seeding completed successfully');
  } catch (error) {
    logger.error('Seeding failed', error.stack || error);
    process.exit(1);
  } finally {
    await app.close();
    logger.log('Application context closed');
  }
}

runSeeds();
