import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { IpTrackerService } from 'src/modules/ip-tracker/ip-tracker.service';

@Injectable()
export class IpTrackerMiddlewareMiddleware implements NestMiddleware {
  constructor(private readonly ipTrackerService: IpTrackerService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    await this.ipTrackerService.tracker(req.ip!);
    next();
  }
}
