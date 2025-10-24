import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresClientController } from '../controllers/stores-client.controller';
import { StoresService } from '../stores.service';
import { StoresEntity } from '../entities/stores.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoresEntity,
    ], 'Karaoke')
  ],
  controllers: [StoresClientController],
  providers: [StoresService]
})
export class StoresClientModule {}