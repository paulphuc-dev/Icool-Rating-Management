import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { StoresEntity } from './entities/stores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoresEntity
    ])
  ],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
