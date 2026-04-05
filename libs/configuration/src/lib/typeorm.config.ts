import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { DatabaseType, DataSource, DataSourceOptions } from 'typeorm';

export class TypeormConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  USERNAME: string;

  @IsString()
  @IsNotEmpty()
  PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE: string;

  @IsString()
  @IsNotEmpty()
  TYPE: DatabaseType;

  constructor(data?: Partial<TypeormConfiguration>) {
    this.HOST = data?.HOST ?? process.env['TYPEORM_HOST'] ?? '';
    this.PORT = data?.PORT ?? process.env['TYPEORM_PORT'] ?? '';
    this.USERNAME = data?.USERNAME ?? process.env['TYPEORM_USERNAME'] ?? '';
    this.PASSWORD = data?.PASSWORD ?? process.env['TYPEORM_PASSWORD'] ?? '';
    this.DATABASE = data?.DATABASE ?? process.env['TYPEORM_DATABASE'] ?? '';
    this.TYPE = (data?.TYPE ??
      process.env['TYPEORM_TYPE'] ??
      'postgres') as DatabaseType;

    console.log(this.DATABASE);
  }
}

function createDbConfig<T extends TypeOrmModuleOptions['type']>(
  type: T,
  config: Omit<TypeOrmModuleOptions, 'type'>,
): TypeOrmModuleOptions {
  return {
    ...config,
    type,
  } as TypeOrmModuleOptions;
}

export const TypeOrmProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const dbType = configService.get('TYPEORM_CONFIG.TYPE');
    const baseConfig = {
      type: configService.get('TYPEORM_CONFIG.TYPE'),
      host: configService.get('TYPEORM_CONFIG.HOST'),
      port: configService.get('TYPEORM_CONFIG.PORT'),
      username: configService.get('TYPEORM_CONFIG.USERNAME'),
      password: configService.get('TYPEORM_CONFIG.PASSWORD'),
      database: configService.get('TYPEORM_CONFIG.DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    };

    return createDbConfig(dbType, baseConfig);
  },
  dataSourceFactory: async (options?: DataSourceOptions) => {
    if (!options) throw new Error('DataSourceOptions are required');
    const dataSource = new DataSource(options);
    const dbType = options.type;

    try {
      Logger.log(`Connecting to Database ${dbType}`);
      await dataSource.initialize();

      Logger.log(`Database ${dbType} connected`);

      if (dataSource.isInitialized) {
        Logger.log(`Database ${dbType} open`);
      }
    } catch (err) {
      Logger.error(`Database ${dbType} connection failed`, err);
      throw err;
    }

    return dataSource;
  },
});
