import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpRecord } from './ip-tracker.entity';
import { IpTrackerService } from './ip-tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpRecord])],
  providers: [IpTrackerService],
  exports: [IpTrackerService],
})
export class IpTrackerModule {}
