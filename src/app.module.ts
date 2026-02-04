import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TimelineModule } from './modules/timeline/timeline.module';

@Module({
  imports: [ProjectsModule, TimelineModule, FeedbacksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
