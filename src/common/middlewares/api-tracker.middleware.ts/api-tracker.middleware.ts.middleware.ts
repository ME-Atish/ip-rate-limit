import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IpTrackerService } from 'src/modules/api-tracker/ip-tracker.service';

@Injectable()
export class ApiTrackerMiddlewareTsMiddleware implements NestMiddleware {
  constructor(private readonly ipTrackerService: IpTrackerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.ipTrackerService.tracker(req.ip!);
    next();
  }
}
