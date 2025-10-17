import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { DummyUser } from './consts/dummy-user.const';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<string> {
    DummyUser 
    if (username !== DummyUser.username || password !== DummyUser.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ username });
    return token;
  }
}
