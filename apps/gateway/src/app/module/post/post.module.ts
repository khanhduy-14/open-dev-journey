import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';

@Module({
  imports: [
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.POST_SERVICE)]),
  ],
  controllers: [PostController],
})
export class PostModule {}
