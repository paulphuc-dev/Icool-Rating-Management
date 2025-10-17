import { Expose } from "class-transformer";
export class OptionResponseDto{

    @Expose()
    id: number;
    
    @Expose()
    scoreValue: number;
    
    @Expose()
    title: string;
    
    @Expose()
    description: string;
}