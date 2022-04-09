import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { AppResources } from 'src/app.roles'
import { Auth } from 'src/config/decorators/auth.decorator'
import { User } from 'src/config/decorators/user.decorator'
import { IUser } from '../user/interfaces/user.interface'
import { CareerService } from './career.service'
import { CareerDto, CareerUpdateDto } from './dto/career.dto'

@ApiTags('Career')
@Controller('career')
export class CareerController {

    constructor(
        private careerService:CareerService,
        @InjectRolesBuilder() 
        private rolesBuilder:RolesBuilder
        ){}

    @Auth({
        action:'create',
        possession:'any',
        resource:AppResources.CAREER
    })    
    @Post('create')
    @ApiOperation({
        summary: 'Create career'
    })
    async create(@Body() data:CareerDto){
        return await this.careerService.create(data)
    } 

    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.CAREER
    }) 
    @Get('get/all') 
    @ApiOperation({
        summary: 'Get careers with subjects'
    })
    async getCareers(){
        return await this.careerService.getCareers()
    }

    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.CAREER
    })
    @Get('get/one/:id') 
    @ApiOperation({
        summary: 'Get career'
    })
    async getCareer(@Param('id') id: string){
        return await this.careerService.getCareer(id)
    }

    @Auth({
        action:'update',
        possession:'any',
        resource:AppResources.CAREER
    })
    @Put('update/:id')
    @ApiOperation({
        summary: 'Update career by id'
    })
    async updateCareer(@Param('id') id:string,@Body() data:CareerUpdateDto ,@User() user:IUser){
        if(this.rolesBuilder
            .can(user.roles)
            .updateAny()
            .granted
        ){
            return await this.careerService.updateCareer(id, data)
        }
    }

    @Auth({
        action:'delete',
        possession:'any',
        resource:AppResources.CAREER
    })
    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete career by id'
    })
    async deleteCareer(@Param('id') id:string){
        return await this.careerService.deleteCareer(id)
    }


}
