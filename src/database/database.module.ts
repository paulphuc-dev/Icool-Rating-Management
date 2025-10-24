import { Module, Global } from '@nestjs/common';
import { typeormConfig } from 'src/configs/database.config';
import { typeormConfig1 } from 'src/configs/database1.config';
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
      name: 'Karaoke',
    }),
    TypeOrmModule.forRoot({
      ...typeormConfig1, 
      name: 'Assets'
    }),
  ],
})
export class DatabaseModule {}
