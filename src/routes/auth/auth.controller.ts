import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from 'src/config/decorators/user.decorator'
import { JwtGuard } from 'src/config/guards/jwt.guard'
import { LocalGuard } from 'src/config/guards/local.guard'
import { LoginDto } from '../user/dto/user.dto'
import { IUser } from '../user/interfaces/user.interface'
import { AuthService } from './auth.service'


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService){}

    @UseGuards(LocalGuard)
    @Post('logIn')
    login(@User() user: IUser, @Body() data:LoginDto) {
        return this.AuthService.login(user)
    }

    @UseGuards(JwtGuard)
    @Post('/refresh/token')
    refresh(@User() user: IUser, @Body() data:LoginDto) {
        return this.AuthService.login(user)
    }


}
