import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoProvider } from '@common/configuration/mongo.config';
import { CONFIGURATION, IConfiguration } from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    MongoProvider,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static CONFIGURATION: IConfiguration = CONFIGURATION;
}
