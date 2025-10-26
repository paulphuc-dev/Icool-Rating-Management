import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksClientController } from '../controllers/feedbacks-client.controller';
import { FeedbacksService } from '../feedbacks.service';
import { FeedbacksEntity } from '../entities/feedbacks.entity';
import { FeedbackDetailEntity } from '../entities/feedback-detail.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature(
      [FeedbacksEntity, FeedbackDetailEntity],
      'Karaoke',
    ),
  ],
  controllers: [FeedbacksClientController],
  providers: [FeedbacksService],
  exports: [FeedbacksService],
})
export class FeedbacksClientModule {}
