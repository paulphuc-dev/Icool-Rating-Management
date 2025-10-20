import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SwaggerDescription } from './consts/swagger-des.const';
import { IPaginate } from './interfaces/paginate.interface';
import type { HttpResponse } from 'src/common/utils/response';
import { StoresService } from './stores.service';
import { StatusCode } from 'src/common/consts/http-code';
import { getDataSuccessfully } from 'src/common/consts/message';

@ApiTags("Stores")
@Controller('stores')
export class StoresController {
    
    constructor(private readonly storesService: StoresService){}

    @Get('/')
    @ApiOperation({ summary: SwaggerDescription.getAll })
    async getStores(): HttpResponse<IPaginate>{

        const data = await this.storesService.getStores();
        return {
            statusCode: StatusCode.OK,
            message: getDataSuccessfully,
            data,
        };

    }
}
