import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { CategoryEntity } from './entities/categories.entity';
import { FeedbacksEntity } from './entities/feedbacks.entity';
import { FeedbackDetailEntity } from './entities/feedback-detail.entity';
import { FilesEntity } from './entities/files.entity';
import { RatingDetailEntity } from './entities/rating-detail.entity';
import { ScaleOptionEntity } from './entities/scale-option.entity';
import { SurveyEntity } from './entities/survey.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        CategoryEntity,
        FeedbacksEntity, 
        FeedbackDetailEntity, 
        FilesEntity,
        RatingDetailEntity,
        ScaleOptionEntity,
        SurveyEntity
      ]), 
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  exports: [FeedbacksService]
})
export class FeedbacksModule {}
