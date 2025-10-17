import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbacksEntity } from './entities/feedbacks.entity';
import { FeedbackDetailEntity } from './entities/feedback-detail.entity';
import { GetFeedBackDto } from './dto/response/get-feedback.dto';
import { IPaginate } from './interfaces/paginate.interface';
import { IFeedback } from './interfaces/feedback.interface';
import { FeedbackDto } from './dto/request/feedback-request.dto';
import { plainToInstance } from 'class-transformer';
import { FeedbackResponseDto } from './dto/response/feedback-response.dto';
import { StatisticRequestDto } from './dto/request/statistic.request.dto';
import { groupByLabel } from './func/flat-data';
import { IStatistic, IData } from './interfaces/statistic.interface';

@Injectable()
export class FeedbacksService {

    constructor(
        @InjectRepository(FeedbacksEntity)
        private readonly _feedbackRepo: Repository<FeedbacksEntity>,
        private readonly dataSource: DataSource,        
    ){}

    async getFeedbacks(getFeedbackReq: GetFeedBackDto): Promise<IPaginate>{

        const page = getFeedbackReq.page ?? 1;
        const limit = getFeedbackReq.limit ?? 10;
        const query = this._feedbackRepo
            .createQueryBuilder('feedback')
            .innerJoinAndSelect('feedback.store', 'store') 
            .innerJoinAndSelect('feedback.scaleOption', 'scaleOption') 
            .innerJoinAndSelect('feedback.feedbackDetails', 'feedbackDetails')   
            .innerJoinAndSelect('feedbackDetails.ratingDetail', 'ratingDetail') 
            .where('feedback.active = :active', { active: true })
            .orderBy('feedback.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit); 

        if(getFeedbackReq.score){
            query.andWhere('scaleOption.scoreValue = :score', { score: getFeedbackReq.score });
        }

        const [data, total] = await query.getManyAndCount();
        const formattedData = plainToInstance(FeedbackResponseDto, data, {
            excludeExtraneousValues: true, 
        });

        return {
            page,
            limit,
            total,
            data: formattedData
        };
    }

    async getStatistic(statisticReq: StatisticRequestDto): Promise<IStatistic> {
        
        const query = this._feedbackRepo
            .createQueryBuilder('feedback')
            .innerJoin('feedback.scaleOption', 'scaleOption')
            .where('feedback.active = :active', { active: true });

        if (statisticReq.storeCode) {

            query.innerJoin('feedback.store', 'store')
            .andWhere('store.code = :code', { code: statisticReq.storeCode })
            .select(['store.name AS label', 'scaleOption.scoreValue AS star','COUNT(*) AS quantity'])
            .groupBy('store.name')
            .addGroupBy('scaleOption.scoreValue');
        } else {
            query.select(['feedback.regionName AS label','scaleOption.scoreValue AS star','COUNT(*) AS quantity' ]);
            if (statisticReq.regionId) {
                query.andWhere('feedback.regionId = :regionId', { regionId: statisticReq.regionId });
            }
            query.groupBy('feedback.regionName').addGroupBy('scaleOption.scoreValue');
        }

        const raw = await query.getRawMany();
        const statisticData: IData[] = groupByLabel(raw);
        return {statisticData}
    }

    async createFeedback(feedbackDto: FeedbackDto): Promise<IFeedback> {
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const feedback = queryRunner.manager.create(FeedbacksEntity, {
                regionId: feedbackDto.regionId,
                regionName: feedbackDto.regionName,
                storeCode: feedbackDto.storeCode,
                optionId: feedbackDto.optionId,
                phoneNumber: feedbackDto.phoneNumber,
                ratingDate: new Date(feedbackDto.ratingDate),
                content: feedbackDto.content,
            });
           
            const savedFeedback = await queryRunner.manager.save(FeedbacksEntity, feedback);
            const feedbackDetails = feedbackDto.suggestionIds.map((detailId) =>
                queryRunner.manager.create(FeedbackDetailEntity, {
                    feedbackId: savedFeedback.id,
                    detailId,
                }),
            );

            await queryRunner.manager.save(FeedbackDetailEntity, feedbackDetails);
            await queryRunner.commitTransaction();
             const fullFeedback = await this._feedbackRepo.findOne({
                where: { id: savedFeedback.id },
                relations: {
                    scaleOption: true,
                    feedbackDetails: {
                        ratingDetail: true,
                    },
                },
            });

            const formatted = plainToInstance(FeedbackResponseDto, fullFeedback, {
                excludeExtraneousValues: true,
            });
            return { data: formatted};
            
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
