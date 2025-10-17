import { IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetStoresDto{

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    size?: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
	page?:  number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
	cursor?:  string; 

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    storeName?: string;
}