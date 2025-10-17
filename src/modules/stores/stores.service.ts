import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoresEntity } from './entities/stores.entity';
import { IPaginate } from './interfaces/paginate.interface';
import { GetStoresDto } from './dto/stores-request.dto';
import { StoresResponseDto } from './dto/store-response.dto';
import { plainToInstance } from 'class-transformer';
import { decodeCursor, encodeCursor } from 'src/common/utils/cursor';
import { formatDateToString } from 'src/common/utils/time-format';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(StoresEntity)
        private readonly _storeRepo:  Repository<StoresEntity>
    ){}

    async getStores(getStoresReq: GetStoresDto): Promise<IPaginate>{
        const limit = getStoresReq.size ?? 10 
        const cursorData = decodeCursor(getStoresReq.cursor);
        const createdAt = cursorData?.createdAt;
        const cursorId = cursorData?.id;

        const query = this._storeRepo
            .createQueryBuilder('store')
            .where('store.active = :active', { active: true })
            .select([
                'store.id',
                'store.code',
                'store.name',
                'store.address',
                'store.district',
                'store.tel',
                'store.createdDate',
                'store.createdBy',
            ])
            .orderBy('store.createdDate', 'DESC')
            .addOrderBy('store.id', 'DESC') 
            .take(limit + 1);

        if (getStoresReq.storeName) {
            query.andWhere('store.name LIKE :name', { name: `%${getStoresReq.storeName}%` });
        }

        if (createdAt && cursorId) {
            query.andWhere(
            '(store.createdDate < :createdAt OR (store.createdDate = :createdAt AND store.id < :id))',
            { createdAt: createdAt, id: cursorId });
        }

        const results = await query.getMany();
        const hasNext = results.length > limit;
        const slicedResults = results.slice(0, limit); 
        const stores = plainToInstance(StoresResponseDto, slicedResults, {excludeExtraneousValues: true});
        const lastItem = slicedResults[slicedResults.length - 1];
        const createdAtString = formatDateToString(lastItem.createdDate);
        const nextCursor = hasNext && lastItem ? encodeCursor(createdAtString, lastItem.id): null;

        return {
            nextCursor,
            hasNext,
            data: stores
        };
    }
}
