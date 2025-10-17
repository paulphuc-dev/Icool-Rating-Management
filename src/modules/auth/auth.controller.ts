import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { HttpResponse } from 'src/common/utils/response';
import { StatusCode } from 'src/common/consts/http-code';
import { loginSuccessfully } from 'src/common/consts/message';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/login')
    async login(@Body() loginReq: LoginDto): HttpResponse<string>{
        const { username, password } = loginReq;
        const token =  await this.authService.login(username, password);
        return {
            statusCode: StatusCode.OK,
            message: loginSuccessfully,
            data: token
        }
    }

}
