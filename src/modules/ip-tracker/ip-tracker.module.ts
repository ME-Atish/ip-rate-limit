import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpRecord } from './ip-tracker.entity';
import { IpTrackerController } from './ip-tracker.controller';
import { IpTrackerService } from './ip-tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpRecord])],
  controllers: [IpTrackerController],
  providers: [IpTrackerService],
})
export class IpTrackerModule {}
