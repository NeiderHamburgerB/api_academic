import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from 'src/config/decorators/user.decorator'
import { LocalGuard } from 'src/config/guards/local.guard'
import { LoginDto } from '../user/dtos/user.dto'
import { IUser } from '../user/interfaces/user.interface'
import { AuthService } from './auth.service'


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService){}

    @UseGuards(LocalGuard)
    @Post('logIn')
    login(@User() user: IUser, @Body() data:LoginDto) {
        console.log(user)
        return this.AuthService.login(user)
    }



}
