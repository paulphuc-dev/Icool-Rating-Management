import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/stores.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    AuthModule,
    StoresModule,
    FeedbacksModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}