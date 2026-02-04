import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbacksService {
  getHello(): string {
    return 'Feedbacks service';
  }
}
