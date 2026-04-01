import {
  ClientsProviderAsyncOptions,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsNotEmptyObject } from 'class-validator';
export enum TCP_SERVICES {
  BLOG_SERVICE = 'TCP_BLOG_SERVICE',
  COMMENT_SERVICE = 'TCP_COMMENT_SERVICE',
  POST_SERVICE = 'TCP_POST_SERVICE',
}

export class TcpConfiguration {
  @IsNotEmptyObject()
  TCP_BLOG_SERVICE: TcpClientOptions;

  @IsNotEmptyObject()
  TCP_COMMENT_SERVICE: TcpClientOptions;

  @IsNotEmptyObject()
  TCP_POST_SERVICE: TcpClientOptions;

  constructor() {
    Object.entries(TCP_SERVICES).forEach(([key, serviceName]) => {
      const host = process.env[`${key}_HOST`] || 'localhost';
      const port = Number(process.env[`${key}_PORT`]);
      this[serviceName] = TcpConfiguration.setServiceConfig(host, port);
    });
  }

  public static setServiceConfig(host: string, port: number): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

export function TcpProvider(
  serviceName: keyof TcpConfiguration,
): ClientsProviderAsyncOptions {
  return {
    name: serviceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
    },
  };
}
