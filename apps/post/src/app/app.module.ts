import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, IConfiguration } from '../configuration';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static CONFIGURATION: IConfiguration = CONFIGURATION;
}
