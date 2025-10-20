import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { IPayload } from './interfaces/payload.interface';
import { DummyUsers } from './consts/dummy-users.const';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<IPayload> {
    const user = DummyUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      username: user.username,
      name: user.name,
      role: user.role,
    };
  }
}
