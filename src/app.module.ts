import { Module } from '@nestjs/common';
import { IpTrackerController } from './modules/api-tracker/ip-tracker.controller';
import { IpTrackerService } from './modules/api-tracker/ip-tracker.service';
import { IpTrackerModule } from './modules/api-tracker/ip-tracker.module';

@Module({
  imports: [IpTrackerModule],
  controllers: [IpTrackerController],
  providers: [IpTrackerService],
})
export class AppModule {}
