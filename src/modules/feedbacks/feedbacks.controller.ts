import { Controller, Get, Post, Query, Body, Header, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiProduces } from '@nestjs/swagger';
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

@ApiTags("Feedbacks")
@Controller('feedbacks')
export class FeedbacksController {
    
    constructor(private readonly feedbackService: FeedbacksService){}

    @Get('/')
    @ApiOperation({ summary: SwaggerDescription.getAll })
    async getFeedbacks(@Query() getFeedbackReq: GetFeedBackDto): HttpResponse<IPaginate>{
        const data = await this.feedbackService.getFeedbacks(getFeedbackReq)
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        };
    }

    @Get('/statistic')
    @ApiOperation({ summary: SwaggerDescription.getStatistic })
    async statistic(@Query() statisticReq: StatisticRequestDto): HttpResponse<IStatistic>{
        const data = await this.feedbackService.getStatistic(statisticReq)
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        };
    }

    @Get('/export')
    @ApiOperation({ summary: SwaggerDescription.getExport})
    @ApiProduces(headerConfig.VALUE)
    @ApiResponse(exportResponse)
    async export(@Res() res: Response) {
        
        const buffer = await this.feedbackService.getExport();
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
