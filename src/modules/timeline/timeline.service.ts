import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelineService {
  getHello(): string {
    return 'Timeline service';
  }
}
