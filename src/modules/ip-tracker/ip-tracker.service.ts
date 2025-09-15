import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IpRecord } from './ip-tracker.entity';

@Injectable()
export class IpTrackerService {
  private readonly maxRequest = 4;
  private readonly windowMinute = 2;
  private readonly blockMinute = 2;
  private readonly tehranTimeZone = 3.5 * 60 * 60 * 1000;

  constructor(
    @InjectRepository(IpRecord)
    private readonly ipRecordRepository: Repository<IpRecord>,
  ) {}

  async tracker(ip: string) {
    // Get time which user sent request
    const nowTime = new Date();
    // Convert time zone to Tehran (Iran's Capital)
    const nowTimeTh = new Date(nowTime.getTime() + this.tehranTimeZone);
    // Find the IP record in the database that matches the given IP address
    let record = await this.ipRecordRepository.findOne({ where: { ip } });

    if (!record) {
      record = this.ipRecordRepository.create({
        ip,
        windowStart: nowTime,
        requestCount: 1,
      });
      await this.ipRecordRepository.save(record);
    }

    // If request reached to maximum request, these codes will run
    if (record.isBlocked && record.blockUntil && nowTime < record.blockUntil) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'To many request',
          message: `Rate limit exceeded. Please try again in ${this.blockMinute} minutes`,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Calculate the end time of the current request window based on the start time, window duration, and Tehran timezone offset
    const windowEnd = new Date(
      record.windowStart.getTime() +
        this.windowMinute * 60 * 1000 +
        this.tehranTimeZone,
    );

    if (nowTimeTh > windowEnd) {
      // If the current time exceeds the rate limit window, reset the request count
      // and start a new window
      record.requestCount = 1;
      record.windowStart = nowTimeTh;
    } else {
      // Otherwise, increment the request count
      record.requestCount += 1;

      // If the count reaches the maximum allowed, block the IP for `blockMinute` duration
      if (record.requestCount >= this.maxRequest) {
        record.isBlocked = true;
        record.blockUntil = new Date(
          nowTime.getTime() + this.blockMinute * 60 * 1000,
        );
      }
    }

    await this.ipRecordRepository.save(record);
  }
}
