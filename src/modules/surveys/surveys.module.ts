import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveyEntity } from './entities/survey.entity';
import { FilesEntity } from './entities/files.entity';
import { CategoryEntity } from './entities/categories.entity';
import { RatingDetailEntity } from './entities/rating-detail.entity';
import { ScaleOptionEntity } from './entities/scale-option.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ 
        CategoryEntity,
        SurveyEntity,
        FilesEntity,
        RatingDetailEntity,
        ScaleOptionEntity
    ]), 
  ],
  controllers: [SurveysController],
  providers: [SurveysService]
})
export class SurveysModule {}
