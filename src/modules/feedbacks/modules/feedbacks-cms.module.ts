import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksCMSController } from '../controllers/feedback-cms.controller';
import { FeedbacksService } from '../feedbacks.service';
import { FeedbacksEntity } from '../entities/feedbacks.entity';
import { FeedbackDetailEntity } from '../entities/feedback-detail.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      FeedbacksEntity, 
      FeedbackDetailEntity
    ]), 
  ],
  controllers: [FeedbacksCMSController],
  providers: [FeedbacksService],
  exports: [FeedbacksService]
})
export class FeedbacksCMSModule {}