import {
  Controller,
  Get,
  Query,
  Res,
  Req,
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
} from '@nestjs/swagger';
import { SwaggerDescription } from '../consts/swagger-des.const';
import { GetFeedBackDto } from '../dto/request/get-feedback.dto';
import { StatisticRequestDto } from '../dto/request/statistic.request.dto';
import type { HttpResponse } from 'src/common/utils/response.util';
import { StatusCode } from 'src/common/consts/http-code';
import { FeedbacksService } from '../feedbacks.service';
import { IPaginate } from '../interfaces/paginate.interface';
import { IStatistic } from '../interfaces/statistic.interface';
import { getDataSuccessfully, forbids } from 'src/common/consts/message';
import { exportResponse } from '../consts/export-response.const';
import { headerConfig } from '../enums/header-config';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { permissions } from 'src/common/consts/permissions';
import type { AuthenticatedRequest } from 'src/modules/auth/interfaces/payload.interface';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksCMSController {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Get('/')
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
}
