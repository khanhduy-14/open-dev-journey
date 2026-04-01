/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = AppModule.CONFIGURATION.TCP_SERV.TCP_POST_SERVICE.options.host;
  const port = AppModule.CONFIGURATION.TCP_SERV.TCP_POST_SERVICE.options.port;
  app.connectMicroservice<MicroserviceOptions>({
    transport: AppModule.CONFIGURATION.TCP_SERV.TCP_POST_SERVICE.transport,
    options: {
      host,
      port,
    },
  });

  await app.startAllMicroservices();
  Logger.log(`🚀 Comment Service is running on: ${host}:${port}`);
}

bootstrap();
