import { IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StatisticRequestDto{

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    regionId?: number;
   
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    storeCode?: string;
}