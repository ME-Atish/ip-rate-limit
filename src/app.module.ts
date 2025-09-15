import { Module } from '@nestjs/common';
import { IpTrackerModule } from './modules/ip-tracker/ip-tracker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), IpTrackerModule],
})
export class AppModule {}
