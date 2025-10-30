import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Repository, DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { FeedbacksEntity } from './entities/feedbacks.entity';
import { FeedbackDetailEntity } from './entities/feedback-detail.entity';
import { GetFeedBackDto } from './dto/request/get-feedback.dto';
import { IPaginate } from './interfaces/paginate.interface';
import { IFeedback } from './interfaces/feedback.interface';
import { FeedbackDto } from './dto/request/feedback-request.dto';
import { FeedbackResponseDto } from './dto/response/feedback-response.dto';
import { StatisticRequestDto } from './dto/request/statistic.request.dto';
import { groupByLabel } from './func/flat-data';
import { IStatistic, IData } from './interfaces/statistic.interface';
import { feedbackColumn } from './consts/column';
import { IExportFeedback } from './interfaces/export-feedback.interface';
import { IFlatRow } from './interfaces/statistic.interface';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbacksEntity, 'Karaoke')
    private readonly _feedbackRepo: Repository<FeedbacksEntity>,

    @InjectDataSource('Karaoke')
    private readonly dataSource: DataSource,
  ) {}

  async getFeedbacks(
    getFeedbackReq: GetFeedBackDto,
    stores: string[],
  ): Promise<IPaginate> {
    const page = getFeedbackReq.page ?? 1;
    const limit = getFeedbackReq.limit ?? 10;
    const query = this._feedbackRepo
      .createQueryBuilder('feedback')
      .innerJoinAndSelect('feedback.store', 'store')
      .innerJoinAndSelect('feedback.scaleOption', 'scaleOption')
      .innerJoinAndSelect('feedback.feedbackDetails', 'feedbackDetails')
      .innerJoinAndSelect('feedbackDetails.ratingDetail', 'ratingDetail')
      .where('feedback.active = :active', { active: true })
      .andWhere('store.code IN (:...storeIds)', { storeIds: stores })
      .orderBy('feedback.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (getFeedbackReq.score) {
      query.andWhere('scaleOption.scoreValue = :score', {
        score: getFeedbackReq.score,
      });
    }

    if (getFeedbackReq.store) {
      query.andWhere('store.name LIKE :name', {
        name: `%${getFeedbackReq.store}%`,
      });
    }

    if (getFeedbackReq.status) {
      query.andWhere('feedback.processStatus =:status', {
        status: getFeedbackReq.status,
      });
    }

    const [data, total] = await query.getManyAndCount();
    const formattedData = plainToInstance(FeedbackResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return {
      page,
      limit,
      total,
      data: formattedData,
    };
  }

  async getStatistic(
    statisticReq: StatisticRequestDto,
    stores: string[],
  ): Promise<IStatistic> {
    const query = this._feedbackRepo
      .createQueryBuilder('feedback')
      .innerJoin('feedback.scaleOption', 'scaleOption')
      .innerJoin('feedback.store', 'store')
      .where('feedback.active = :active', { active: true })
      .andWhere('store.code IN (:...storeIds)', { storeIds: stores });

    if (statisticReq.storeCode) {
      query
        .andWhere('store.code = :code', { code: statisticReq.storeCode })
        .select([
          'store.name AS label',
          'scaleOption.scoreValue AS star',
          'COUNT(*) AS quantity',
        ])
        .groupBy('store.name')
        .addGroupBy('scaleOption.scoreValue');
    } else {
      query.select([
        'feedback.regionName AS label',
        'scaleOption.scoreValue AS star',
        'COUNT(*) AS quantity',
      ]);
      if (statisticReq.regionId) {
        query.andWhere('feedback.regionId = :regionId', {
          regionId: statisticReq.regionId,
        });
      }
      query.groupBy('feedback.regionName').addGroupBy('scaleOption.scoreValue');
    }

    const raw = await query.getRawMany<IFlatRow>();
    const statisticData: IData[] = groupByLabel(raw);
    return { statisticData };
  }

  async getData(stores: string[]): Promise<IExportFeedback[]> {
    const query = this._feedbackRepo
      .createQueryBuilder('feedback')
      .innerJoinAndSelect('feedback.store', 'store')
      .innerJoinAndSelect('feedback.scaleOption', 'scaleOption')
      .innerJoinAndSelect('feedback.feedbackDetails', 'feedbackDetails')
      .innerJoinAndSelect('feedbackDetails.ratingDetail', 'ratingDetail')
      .where('feedback.active = :active', { active: true })
      .andWhere('store.code IN (:...storeIds)', { storeIds: stores })
      .select([
        'feedback.id',
        'feedback.regionId',
        'feedback.regionName',
        'feedback.phoneNumber',
        'feedback.ratingDate',
        'feedback.content',
        'store.name',
        'scaleOption.scoreValue',
        'feedbackDetails.feedbackId',
        'ratingDetail.title',
      ])
      .orderBy('feedback.ratingDate', 'DESC');

    const data = await query.getMany();
    const formattedData: IExportFeedback[] = data.map((feedback) => ({
      id: feedback.id,
      regionId: feedback.regionId,
      regionName: feedback.regionName,
      phoneNumber: feedback.phoneNumber,
      storeName: feedback.store?.name,
      scoreValue: feedback.scaleOption?.scoreValue,
      content: feedback.content,
      ratingDate: feedback.ratingDate,
      ratingDetailTitles: feedback.feedbackDetails.map(
        (detail) => detail.ratingDetail?.title,
      ),
    }));
    return formattedData;
  }

  async getExport(stores: string[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Báo cáo đánh giá');
    const data = await this.getData(stores);

    worksheet.columns = feedbackColumn;
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEFEFEF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((fb) => {
      const detailText = Array.isArray(fb.ratingDetailTitles)
        ? fb.ratingDetailTitles.join('\n')
        : '';

      worksheet.addRow({
        id: fb.id,
        regionId: fb.regionId,
        regionName: fb.regionName,
        phoneNumber: fb.phoneNumber,
        ratingDate: fb.ratingDate,
        store: fb.storeName,
        score: fb.scoreValue,
        content: fb.content,
        ratingDetail: detailText,
      });
    });

    worksheet.getColumn('ratingDetail').alignment = {
      wrapText: true,
      vertical: 'top',
    };
    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
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
        processStatus: 'pending',
      });

      const savedFeedback = await queryRunner.manager.save(
        FeedbacksEntity,
        feedback,
      );
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
      return { data: formatted };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async readFeedback(feedbackId: string): Promise<IMessage> {
    const feedback = await this._feedbackRepo.findOne({
      where: { id: feedbackId, deleteFlag: false },
    });
    if (!feedback) {
      return { message: 'Feedback not found' };
    }

    feedback.processStatus = 'resolved';
    await this._feedbackRepo.save(feedback);
    return { message: 'Feedback is marked as read' };
  }
}
