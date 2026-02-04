import { Controller, Get } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  getHello(): string {
    return this.feedbacksService.getHello();
  }
}
