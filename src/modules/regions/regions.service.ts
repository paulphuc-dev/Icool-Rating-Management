import * as path from 'path';
import * as fs from 'fs';
import * as QRCode from 'qrcode';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../regions/entities/regions.entity';
import { createUploadPath, saveFile } from 'src/common/utils/file.util';
import { IQrCode } from '../regions/interfaces/qrcode.interface';
import { PaginateRequestDto } from './dto/requests/paginate.request.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionEntity, 'Assets')
    private readonly _regionRepo: Repository<RegionEntity>,

    private readonly configService: ConfigService,
  ) {}

  async getQRCodes(paginate: PaginateRequestDto): Promise<IQrCode[]> {
    const page = paginate.page ?? 1;
    const limit = paginate.limit ?? 10;
    const result: IQrCode[] = [];

    const baseUrl = this.configService.get<string>('WEB_URL');
    const srcUrl = this.configService.get<string>('BASE_URL');
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
    const uploadPath = createUploadPath();

    if (fs.existsSync(uploadPath)) {
      fs.rmSync(uploadPath, { recursive: true, force: true });
    }
    fs.mkdirSync(uploadPath, { recursive: true });

    for (const region of regions) {
      const qrData = `${baseUrl}?id=${region.id}`;
      const buffer = await QRCode.toBuffer(qrData, {
        color: { dark: '#016bffff', light: '#fff' },
        width: 300,
      });

      const fileName = `region-${region.name}.png`;
      const filePath = saveFile(uploadPath, fileName, buffer);
      const relativePath = path
        .relative(process.cwd(), filePath)
        .replace(/\\/g, '/');
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
