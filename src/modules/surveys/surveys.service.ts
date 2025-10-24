import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { plainToInstance } from 'class-transformer';
import { ISurvey } from './interfaces/ISurvey.interface';
import { SurveyResponseDto } from './dto/response/survey-response.dto';

@Injectable()
export class SurveysService {

    constructor(
        @InjectRepository(SurveyEntity, 'Karaoke')
        private readonly _surveyRepo: Repository<SurveyEntity>
    ){}

    async getSurvey(star: number): Promise<ISurvey | null>{
        const query = this._surveyRepo.createQueryBuilder('survey')
        .innerJoinAndSelect('survey.scaleOptions', 'options') 
        .innerJoinAndSelect('options.emoji','emoji')
        .innerJoinAndSelect('options.ratingDetail','ratingDetail')
        .where('survey.displayPosition = 1')
        .andWhere('options.scoreValue = :scoreValue', { scoreValue: star })
        .andWhere('emoji.drafted = :drafted', {drafted: false})
        .select([
            'survey.id',
            'survey.title',
            'options.id',
            'options.scoreValue',
            'options.title',
            'emoji.id',
            'emoji.url',
            'ratingDetail.id',
            'ratingDetail.title'
        ])
        
        const res = await query.getOne();
        if (!res) return null;
        const baseUrl = process.env.BASE_URL || '';

        res.scaleOptions?.forEach(option => {
            if (option.emoji?.url && !option.emoji.url.startsWith('http')) {
                option.emoji.url = `${baseUrl}${option.emoji.url}`;
            }
        });
        const survey = plainToInstance(SurveyResponseDto, res, {excludeExtraneousValues: true});
        return {survey}
    } 
}
