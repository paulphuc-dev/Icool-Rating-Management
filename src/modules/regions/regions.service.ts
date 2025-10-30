import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../regions/entities/regions.entity';
import { createUploadPath } from 'src/common/utils/file.util';
import { generateQRCode } from 'src/common/utils/qrcode-generate.util';
import { IQrCode } from '../regions/interfaces/qrcode.interface';
import { GetRegionDto } from './dto/requests/paginate.request.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionEntity, 'Assets')
    private readonly _regionRepo: Repository<RegionEntity>,
    private readonly configService: ConfigService,
  ) {}

  async getQRCodes(paginate: GetRegionDto): Promise<IQrCode[]> {
    const page = paginate.page ?? 1;
    const limit = paginate.limit ?? 10;
    const result: IQrCode[] = [];

    const baseUrl = this.configService.get<string>('WEB_URL') ?? '';
    const srcUrl = this.configService.get<string>('BASE_URL') ?? '';
    const query = this._regionRepo
      .createQueryBuilder('regions')
      .leftJoinAndSelect('regions.store', 'store')
      .where('regions.active = 1')
      .andWhere('regions.deleted = 0')
      .andWhere('store.active = 1')
      .andWhere('store.deleted = 0')
      .select([
        'regions.id',
        'regions.code',
        'regions.name',
        'regions.note',
        'store.name',
      ]);

    if (paginate.storeName) {
      query.andWhere('store.name LIKE :name', {
        name: `%${paginate.storeName}%`,
      });
    }

    query.skip((page - 1) * limit).take(limit);
    const regions = await query.getMany();
    const uploadPath = createUploadPath('regions');

    if (fs.existsSync(uploadPath)) {
      fs.rmSync(uploadPath, { recursive: true, force: true });
    }
    fs.mkdirSync(uploadPath, { recursive: true });

    for (const region of regions) {
      const relativePath = await generateQRCode(
        baseUrl,
        uploadPath,
        region.id.toString(),
        region.name,
      );
      result.push({
        id: region.id,
        storeId: region.storeId,
        code: region.code,
        name: region.name,
        note: region.note,
        qrcode: srcUrl + relativePath,
        store: {
          name: region.store.name,
        },
      });
    }
    return result;
  }
}
