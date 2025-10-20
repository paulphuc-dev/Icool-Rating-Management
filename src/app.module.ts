import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/stores.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { DatabaseModule } from './database/database.module';
import { SurveysModule } from './modules/surveys/surveys.module';
@Module({
  imports: [
    AuthModule,
    StoresModule,
    FeedbacksModule,
    SurveysModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}