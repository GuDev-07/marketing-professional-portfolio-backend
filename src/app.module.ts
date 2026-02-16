import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { BigIntInterceptor } from './common/interceptors/bigint.interceptor';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TimelineModule } from './modules/timeline/timeline.module';

@Module({
  imports: [ProjectsModule, TimelineModule, FeedbacksModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
  ],
})
export class AppModule {}
