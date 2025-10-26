import { Expose } from 'class-transformer';
export class FileResponseDto {
  @Expose()
  id: number;

  @Expose()
  url: string;
}
