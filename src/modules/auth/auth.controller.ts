import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { HttpResponse } from 'src/common/utils/response.util';
import { StatusCode } from 'src/common/consts/http-code';
import { loginSuccessfully } from 'src/common/consts/message';
import { IPayload } from './interfaces/payload.interface';
import { description } from './consts/des-swagger.const';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: description })
  @Post('/login')
  async login(@Body() loginReq: LoginDto): HttpResponse<IPayload> {
    const { username, password } = loginReq;
    const data = await this.authService.login(username, password);
    return {
      statusCode: StatusCode.OK,
      message: loginSuccessfully,
      data,
    };
  }
}
