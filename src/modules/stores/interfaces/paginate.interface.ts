import { StoresResponseDto } from "../dto/store-response.dto";
export interface IPaginate{
    nextCursor: string | null;            
	hasNext:    boolean; 
    data:  StoresResponseDto[];
} 