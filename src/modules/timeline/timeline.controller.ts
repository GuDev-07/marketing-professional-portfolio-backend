import { Controller, Get } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  getHello(): string {
    return this.timelineService.getHello();
  }
}
