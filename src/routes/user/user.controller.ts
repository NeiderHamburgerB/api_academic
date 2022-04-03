import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/config/guards/jwt.guard'
import { UserCreationDto } from './dtos/user.dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private UserService:UserService){}

    @Post('create')
    @ApiOperation({
        summary:'Create user'
    })
    async create(@Body() data: UserCreationDto){
        return await this.UserService.createUser(data)
    }

    @Get(':id')
    @ApiOperation({
        summary:'Get user'
    })
    async getOne(@Param('id') _id:string){
        return await this.UserService.getUser({_id}, false)
    }

    @UseGuards(JwtGuard)
    @Get('test')
    @ApiOperation({
        summary:'test'
    })
    test(){
        return 'low'
    }






}
