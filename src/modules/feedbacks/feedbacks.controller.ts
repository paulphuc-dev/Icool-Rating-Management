import { Controller, Get, Post, Query, Body, Res, Req, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiProduces, ApiBearerAuth } from '@nestjs/swagger';
import { SwaggerDescription } from './consts/swagger-des.const';
import { FeedbackDto } from './dto/request/feedback-request.dto';
import { GetFeedBackDto } from './dto/response/get-feedback.dto';
import { StatisticRequestDto } from './dto/request/statistic.request.dto';
import type { HttpResponse} from 'src/common/utils/response';
import { StatusCode } from 'src/common/consts/http-code';
import { FeedbacksService } from './feedbacks.service';
import { IPaginate } from './interfaces/paginate.interface';
import { IFeedback } from './interfaces/feedback.interface';
import { IStatistic } from './interfaces/statistic.interface';
import { getDataSuccessfully, createdSuccessfully } from 'src/common/consts/message';
import { exportResponse } from './consts/export-response.const';
import { headerConfig } from './enums/header-config';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiTags("Feedbacks")
@Controller('feedbacks')
export class FeedbacksController {
    
    constructor(private readonly feedbackService: FeedbacksService){}

    @ApiBearerAuth('Bearer')
    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiOperation({ summary: SwaggerDescription.getAll })
    async getFeedbacks(@Query() getFeedbackReq: GetFeedBackDto, @Req() req: any): HttpResponse<IPaginate>{
        const stores = req.user.storeIds; 
        const data = await this.feedbackService.getFeedbacks(getFeedbackReq, stores)
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        };
    }

    @ApiBearerAuth('Bearer')
    @UseGuards(JwtAuthGuard)
    @Get('/statistic')
    @ApiOperation({ summary: SwaggerDescription.getStatistic })
    async statistic(@Query() statisticReq: StatisticRequestDto, @Req() req: any): HttpResponse<IStatistic>{
        const stores = req.user.storeIds;
        const data = await this.feedbackService.getStatistic(statisticReq, stores)
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        };
    }

    @ApiBearerAuth('Bearer')
    @UseGuards(JwtAuthGuard)
    @Get('/export')
    @ApiOperation({ summary: SwaggerDescription.getExport})
    @ApiProduces(headerConfig.VALUE)
    @ApiResponse(exportResponse)
    async export(@Res() res: Response, @Req() req: any) {
        
        const stores = req.user.storeIds;
        const buffer = await this.feedbackService.getExport(stores);
        res.setHeader(
            headerConfig.TYPE,
            headerConfig.VALUE,
        );
        res.setHeader(
            headerConfig.TYPE1,
            headerConfig.FILE,
        );
        res.send(buffer);
    }

    @Post('/')
    @ApiOperation({ summary: SwaggerDescription.post })
    async createFeedback(@Body() feedback: FeedbackDto): HttpResponse<IFeedback>{
        const data = await this.feedbackService.createFeedback(feedback)
        return {
            statusCode: StatusCode.CREATED,
            message: createdSuccessfully,
            data,
        };
    }

}
