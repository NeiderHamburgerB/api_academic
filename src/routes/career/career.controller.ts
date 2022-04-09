import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { CareerService } from './career.service'
import { CareerDto } from './dto/career.dto'

@ApiTags('Career')
@Controller('career')
export class CareerController {

    constructor(
        private careerService:CareerService,
        @InjectRolesBuilder() 
        private rolesBuilder:RolesBuilder
        ){}

    @Post('create')
    async create(@Body() data:CareerDto){
        return await this.careerService.create(data)
    } 


}
