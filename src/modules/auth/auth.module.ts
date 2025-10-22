import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersEntity } from './entities/users.entity';
import { GroupICEntity } from './entities/group-ic.entity';
import { GroupManagerEntity } from './entities/group-manager.entity';
import { JwtAuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    TypeOrmModule.forFeature([
        UsersEntity,
        GroupICEntity,
        GroupManagerEntity
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], 
  exports: [JwtModule, AuthService, JwtAuthGuard],
})
export class AuthModule {}
