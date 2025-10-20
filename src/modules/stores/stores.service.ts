import { Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoresEntity } from './entities/stores.entity';
import { IPaginate } from './interfaces/paginate.interface';
import { StoresResponseDto } from './dto/store-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(StoresEntity)
        private readonly _storeRepo:  Repository<StoresEntity>
    ){}

    async getStores(): Promise<IPaginate>{
        const query = this._storeRepo
            .createQueryBuilder('store')
            .where('store.active = :active', { active: true })
            .select([
                'store.id',
                'store.code',
                'store.name',
                'store.address',
                'store.createdDate'
            ])
            .orderBy('store.id', 'ASC') 
            
        const res = await query.getMany(); 
        const data = plainToInstance(StoresResponseDto, res, {excludeExtraneousValues: true})
        return { data }
    }
}
