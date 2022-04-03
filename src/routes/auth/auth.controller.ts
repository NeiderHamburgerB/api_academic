import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from 'src/config/decorators/user.decorator'
import { LocalGuard } from 'src/config/guards/local.guard'
import { IUser } from '../user/interfaces/user.interface'
import { AuthService } from './auth.service'


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService){}

    @UseGuards(LocalGuard)
    @Post('logIn')
    login(@User() user: IUser) {
        return this.AuthService.login(user)
    }



}
