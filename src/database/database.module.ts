import { Module, Global } from '@nestjs/common';
import { typeormConfig } from 'src/configs/database.config';
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
      ...typeormConfig, 
    }),
  ],
})
export class DatabaseModule {}
