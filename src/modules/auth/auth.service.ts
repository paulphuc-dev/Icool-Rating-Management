import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { GroupICEntity } from './entities/group-ic.entity';
import { IPayload } from './interfaces/payload.interface';
import { IGroups } from './interfaces/groups.interface';
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


  async getGroups(userId: string): Promise<IGroups[]>{
    const groups = await this._groupICRepo
      .createQueryBuilder("groupIc")
      .innerJoin("groupIc.groupMangers", "groupMangers")
      .where("groupMangers.managerId = :managerId", { managerId: userId })
      .select([
        "groupIc.code AS code",
        "groupIc.name AS name"
      ])
      .getRawMany();

    return groups.map(p => ({
      code: p.code,
      name: p.name,
    }));
  }

  async getPermissions(userId: string, group: string): Promise<string[]> {
    
    const groups = await this._groupICRepo
      .createQueryBuilder("groupIc")
      .innerJoin("groupIc.groupMangers", "groupMangers")
      .select("groupIc.permissions")
      .where("groupMangers.managerId = :managerId", { managerId: userId })
      .andWhere("groupIc.code = :code", {code: group})
      .getMany();

    const permissionsArrays = groups.map(g => JSON.parse(g.permissions));
    const allPermissions = ([] as string[]).concat(...permissionsArrays);
    const uniquePermissions = Array.from(new Set(allPermissions));
    return uniquePermissions;

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

    const groups = await this.getGroups(user.id);
    for (const group of groups){
      if (group.code == hardcode.DEFAULT_GROUP) {
        flag = true;
        break;
      }
    }
    const permissions = await this.getPermissions(user.id, hardcode.DEFAULT_GROUP)

    if(!flag){
      throw new UnauthorizedException(forbid);
    }

    const payload = {
      sub: user.id,
      username: user.sale,
      name: user.name,
      permissions,
      storeIds: user.userStores.map(us => us.storeId),
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      username: payload.username,
      name: payload.name,
      permissions,
      storeIds: payload.storeIds
    };
  }
}
