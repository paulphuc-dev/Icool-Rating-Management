import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { GroupICEntity } from './entities/group-ic.entity';
import { IPayload } from './interfaces/payload.interface';
import { IPermissions } from './interfaces/permission.interface';
import { hardcode } from './enums/hardcode.const';
import { loginFailed, forbid, invalidToken } from 'src/common/consts/message';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly _userRepo: Repository<UsersEntity>,
    @InjectRepository(GroupICEntity)
    private readonly _groupICRepo: Repository<GroupICEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken<T extends object = any>(token: string): Promise<T> {
    try {
      const actualToken = token.startsWith('Bearer')
        ? token.slice(7)
        : token;
      const payload = this.jwtService.verify<T>(actualToken);
      return payload;
    } catch (error) {
      throw new UnauthorizedException(invalidToken);
    }
  }


  async getPermission(userId: string): Promise<IPermissions[]>{
    const permissions = await this._groupICRepo
      .createQueryBuilder("groupIc")
      .innerJoin("groupIc.groupMangers", "groupMangers")
      .where("groupMangers.managerId = :managerId", { managerId: userId })
      .select([
        "groupIc.code AS code",
        "groupIc.name AS name"
      ])
      .getRawMany();

    return permissions.map(p => ({
      code: p.code,
      name: p.name,
    }));
  }

  async login(username: string, password: string): Promise<IPayload> {
    
    let flag = false;
    const query = this._userRepo.createQueryBuilder("user")
    .innerJoinAndSelect("user.userStores", "userStores")
    .where("user.sale = :sale", {sale: username})
    .andWhere("user.pin = :pin", {pin: password})
    .andWhere("user.status = 4")
    .andWhere("user.active = :active", {active: true})
    .andWhere("user.isLocked = :locked", {locked: false})
    .select(['user.id', 'user.code' ,'user.sale','user.name', 'userStores.storeId'])

    const user = await query.getOne()
    if(!user){
      throw new UnauthorizedException(loginFailed); 
    }

    const permissions = await this.getPermission(user.id);
    for (const permission of permissions){
      if (permission.code == hardcode.DEFAULT_PERMISSION) {
        flag = true;
        break;
      }
    }

    if(!flag){
      throw new UnauthorizedException(forbid);
    }

    const payload = {
      sub: user.id,
      username: user.sale,
      name: user.name,
      storeIds: user.userStores.map(us => us.storeId),
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      username: payload.username,
      name: payload.name,
      storeIds: payload.storeIds
    };
  }
}
