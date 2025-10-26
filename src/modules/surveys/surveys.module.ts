import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SurveysClientModule } from './modules/surveys-client.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'client',
        module: SurveysClientModule,
      },
    ]),
    SurveysClientModule,
  ],
})
export class SurveysModule {}
