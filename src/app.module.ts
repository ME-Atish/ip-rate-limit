import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IpTrackerModule } from './modules/ip-tracker/ip-tracker.module';
import { AppDataSource } from './database/data-source';
import { IpTrackerMiddlewareMiddleware } from './common/middlewares/api-tracker.middleware.ts/ip-tracker.middleware';
import { GetHelloModule } from './modules/get-hello/get-hello.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    IpTrackerModule,
    GetHelloModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpTrackerMiddlewareMiddleware).forRoutes('*');
  }
}
