import {
  Controller,
  Get,
  Query,
  Res,
  Req,
  Patch,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProduces,
  ApiBearerAuth,
  ApiExtraModels,
} from '@nestjs/swagger';
import type { HttpResponse } from 'src/common/utils/response.util';
import type { AuthenticatedRequest } from 'src/modules/auth/interfaces/payload.interface';
import {
  FeedbacksService,
  GetFeedBackDto,
  StatisticRequestDto,
  IPaginate,
  IStatistic,
  SwaggerDescription,
  extraModels,
  exportResponse,
  headerConfig,
  ApiQueryDto,
  JwtAuthGuard,
  permissions,
  forbids,
  StatusCode,
  getDataSuccessfully,
  IMessage,
  readSuccessfully,
} from '../index';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Feedbacks')
@ApiExtraModels(...extraModels)
@Controller('feedbacks')
export class FeedbacksCMSController {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Get('/')
  @ApiQueryDto(GetFeedBackDto)
  @ApiOperation({ summary: SwaggerDescription.getAll })
  async getFeedbacks(
    @Query() getFeedbackReq: GetFeedBackDto,
    @Req() req: AuthenticatedRequest,
  ): HttpResponse<IPaginate> {
    if (!req.user.permissions.includes(permissions.feedbacks.view)) {
      throw new ForbiddenException(forbids.getFeedback);
    }
    const stores = req.user.storeIds;
    const data = await this.feedbackService.getFeedbacks(
      getFeedbackReq,
      stores,
    );
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }

  @Get('/statistic')
  @ApiQueryDto(StatisticRequestDto)
  @ApiOperation({ summary: SwaggerDescription.getStatistic })
  async statistic(
    @Query() statisticReq: StatisticRequestDto,
    @Req() req: AuthenticatedRequest,
  ): HttpResponse<IStatistic> {
    if (!req.user.permissions.includes(permissions.feedbacks.statistic)) {
      throw new ForbiddenException(forbids.statisticFeedback);
    }
    const stores = req.user.storeIds;
    const data = await this.feedbackService.getStatistic(statisticReq, stores);
    return {
      statusCode: StatusCode.OK,
      message: getDataSuccessfully,
      data,
    };
  }

  @Get('/export')
  @ApiOperation({ summary: SwaggerDescription.getExport })
  @ApiProduces(headerConfig.VALUE)
  @ApiResponse(exportResponse)
  async export(@Res() res: Response, @Req() req: AuthenticatedRequest) {
    if (!req.user.permissions.includes(permissions.feedbacks.export)) {
      throw new ForbiddenException(forbids.exportFeedback);
    }
    const stores = req.user.storeIds;
    const buffer = await this.feedbackService.getExport(stores);
    res.setHeader(headerConfig.TYPE, headerConfig.VALUE);
    res.setHeader(headerConfig.TYPE1, headerConfig.FILE);
    res.send(buffer);
  }

  @Patch('/:id')
  @ApiOperation({ summary: SwaggerDescription.getExport })
  async read(@Param('id') feedbackId: string): HttpResponse<IMessage> {
    const data = await this.feedbackService.readFeedback(feedbackId);
    return {
      statusCode: StatusCode.OK,
      message: readSuccessfully,
      data,
    };
  }
}
