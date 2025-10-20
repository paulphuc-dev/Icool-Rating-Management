import { Expose, Type } from "class-transformer";
import { OptionResponseDto } from "./option-response.dto";

export class SurveyResponseDto{

    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose({ name: 'scaleOptions' })
    @Type(() => OptionResponseDto)
    options: OptionResponseDto[];

}