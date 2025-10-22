import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FeedbacksClientModule } from './modules/feedback-client.module';
import { FeedbacksCMSModule } from './modules/feedbacks-cms.module';


@Module({
  imports: [
     RouterModule.register([
      {
        path:'cms',
        module: FeedbacksCMSModule
      },
      {
        path:'client',
        module: FeedbacksClientModule
      }
     ]),
     FeedbacksCMSModule,
     FeedbacksClientModule
  ]
})
export class FeedbacksModule {}
