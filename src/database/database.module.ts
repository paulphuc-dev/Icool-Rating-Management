import { Module, Global } from '@nestjs/common';
import { typeormKaraokeConfig } from 'src/configs/karaoke-database.config';
import { typeormAssetsConfig } from 'src/configs/assets-database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...typeormKaraokeConfig,
      name: 'Karaoke',
    }),
    TypeOrmModule.forRoot({
      ...typeormAssetsConfig,
      name: 'Assets',
    }),
  ],
})
export class DatabaseModule {}
