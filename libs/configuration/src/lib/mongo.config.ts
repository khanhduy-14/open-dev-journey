import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export class MongoConfiguration {
  @IsString()
  @IsNotEmpty()
  URL: string;
  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  @IsOptional()
  POOL_SIZE: number;

  @IsNumber()
  @IsOptional()
  CONNECTION_TIMEOUT_MS: number;

  @IsNumber()
  @IsOptional()
  SOCKER_TIMEOUT_MS: number;

  constructor(data?: Partial<MongoConfiguration>) {
    this.URL = data?.URL || process.env['MONGO_URL'] || '';
    this.DB_NAME = data?.DB_NAME || process.env['MONGO_DB_NAME'] || '';
    this.POOL_SIZE =
      data?.POOL_SIZE || Number(process.env['MONGO_POOL_SIZE']) || 10;
    this.CONNECTION_TIMEOUT_MS =
      data?.CONNECTION_TIMEOUT_MS ||
      Number(process.env['MONGO_CONNECTION_TIMEOUT_MS']) ||
      15000;
    this.SOCKER_TIMEOUT_MS =
      data?.SOCKER_TIMEOUT_MS ||
      Number(process.env['MONGO_SOCKER_TIMEOUT_MS']) ||
      360000;
  }
}

export const MongoProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_CONFIG.URL'),
    dbName: configService.get<string>('MONGO_CONFIG.DB_NAME'),
    maxPoolSize: configService.get<number>('MONGO_CONFIG.POOL_SIZE'),
    connectionTimeoutMS: configService.get<number>(
      'MONGO_CONFIG.CONNECT_TIMEOUT_MS',
    ),
    socketTimeoutMS: configService.get<number>(
      'MONGO_CONFIG>SOCKET_TIMEOUT_MS',
    ),
    onConnectionCreate(connection: Connection) {
      connection.on('connected', () => Logger.log('MongoDB connected'));
      connection.on('open', () => Logger.log('MongoDB open'));
      connection.on('disconnected', () => Logger.log('MongoDB disconnected'));
      connection.on('reconnected', () => Logger.log('MongoDB reconnected'));
      connection.on('disconnecting', () => Logger.log('MongoDB disconnecting'));

      return connection;
    },
  }),
});
