import { Expose } from "class-transformer";
export class DetailResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

}