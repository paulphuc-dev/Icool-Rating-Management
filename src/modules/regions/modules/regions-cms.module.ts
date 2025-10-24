import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsCMSController } from '../controllers/regions-cms.controller';
import { RegionsService } from '../regions.service';
import { RegionEntity } from '../entities/regions.entity';
import { StoresEntity } from '../entities/stores.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RegionEntity,
      StoresEntity
    ], 'Assets')
  ],
  controllers: [RegionsCMSController],
  providers: [RegionsService]
})
export class RegionsCMSModule {}