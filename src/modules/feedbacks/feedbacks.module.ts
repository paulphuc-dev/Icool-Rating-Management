import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksEntity } from './entities/feedbacks.entity';
import { FeedbackDetailEntity } from './entities/feedback-detail.entity';
import { RatingDetailEntity } from '../surveys/entities/rating-detail.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        FeedbacksEntity, 
        FeedbackDetailEntity
      ]), 
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  exports: [FeedbacksService]
})
export class FeedbacksModule {}
