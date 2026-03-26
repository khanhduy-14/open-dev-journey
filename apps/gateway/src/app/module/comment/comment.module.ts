import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
@Module({
  imports: [
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.COMMENT_SERVICE)]),
  ],
  controllers: [CommentController],
})
export class CommentModule {}
