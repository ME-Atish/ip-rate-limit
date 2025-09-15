import { Module } from '@nestjs/common';
import { IpTrackerController } from './modules/ip-tracker/ip-tracker.controller';
import { IpTrackerService } from './modules/ip-tracker/ip-tracker.service';
import { IpTrackerModule } from './modules/ip-tracker/ip-tracker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), IpTrackerModule],
  controllers: [IpTrackerController],
  providers: [IpTrackerService],
})
export class AppModule {}
