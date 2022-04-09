import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { AppResources } from 'src/app.roles'
import { Auth } from 'src/config/decorators/auth.decorator'
import { User } from 'src/config/decorators/user.decorator'
import { UserCreationDto, UserUpdateDto } from './dtos/user.dto'
import { IUser } from './interfaces/user.interface'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private UserService:UserService,
        @InjectRolesBuilder()
        private rolesBuilder:RolesBuilder
        ){}

    @Auth({
        action:'create',
        possession:'any',
        resource:AppResources.USER
    })
    @Post('create')
    @ApiOperation({
        summary:'Create user'
    })
    async create(@Body() data: UserCreationDto){
        return await this.UserService.createUser(data)
    }

    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.USER
    })
    @Get('get/all')
    @ApiOperation({
        summary:'Get all users'
    })
    async getAll() {
        return await this.UserService.getAll()
    }

    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.USER
    })
    @Get('get/:role')
    @ApiOperation({
        summary: 'Get users for role'
    })
    async getUsersByRoles(@Param('role') role:string){
        return await this.UserService.getUsersByRoles(role)
    }

    @Auth({
        action:'read',
        possession:'own',
        resource:AppResources.USER
    })
    @Get('get/one/:id')
    @ApiOperation({
        summary:'Get user by id'
    })
    async getUser(@Param('id') _id: string ){
        return await this.UserService.getUser({_id}, false)
    }

    @Auth({
        action:'read',
        possession:'own',
        resource:AppResources.USER
    })
    @Get('get/all/career/:careerId')
    @ApiOperation({
        summary: 'Get students of the career'
    })
    async getUsersCareer(@Param('careerId') careerId:string){
        return await this.UserService.getUsersCareer(careerId)
    }

    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.USER
    })
    @Get('get/totalstudents/carees')
    @ApiOperation({
        summary: 'Get total of students by careers'
    })
    async getTotalUsersCareers(){
        return await this.UserService.getTotalUsersCareers()
    }


    @Auth({
        action:'update',
        possession:'own',
        resource:AppResources.USER
    })
    @Put('update/:userId')
    @ApiOperation({
        summary: 'Update user'
    })
    async updateUser(@Param('userId') userId:string, @Body() data:UserUpdateDto,@User() user: IUser ){
        if(this.rolesBuilder
                  .can(user.roles)
                  .updateAny(AppResources.USER)
                  .granted
                  ){
                     return await this.UserService.updateUser(userId,data)
                  }else{
                    return await this.UserService.updateUser(userId, data, user)
                  }
    }

    @Auth({
        action:'delete',
        possession:'any',
        resource:AppResources.USER
    })
    @Delete('delete')
    async deleteUser(@Param('userId') userId:string, @User() user:IUser){
        if(this.rolesBuilder
            .can(user.roles)
            .updateAny(AppResources.USER)
            .granted
            ){
                return await this.UserService.deleteUser(userId)
            }else{
                return await this.UserService.deleteUser(userId, user)
            }
    }

}









