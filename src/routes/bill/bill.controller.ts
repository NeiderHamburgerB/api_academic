import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/config/decorators/auth.decorator';
import { User } from 'src/config/decorators/user.decorator';
import { IUser } from '../user/interfaces/user.interface';
import { BillService } from './bill.service';
import { BillCreateDto } from './dto/bill.dto';

@ApiTags('Bill')
@Controller('bill')
export class BillController {

    constructor(private billService:BillService,
        @InjectRolesBuilder() private rolesBuilder:RolesBuilder
        ){

    }

    @Auth({
        action:'create',
        possession:'own',
        resource:AppResources.BILL
    })
    @Post('create')
    @ApiOperation({
        summary:'Create bill'
    })
    async create(@Body() data:BillCreateDto){
        return await this.billService.create(data)
    }


    @Auth({
        action:'read',
        possession:'any',
        resource:AppResources.BILL
    })
    @Get('get/all')
    @ApiOperation({
        summary:'Get all'
    })
    async getAll(){
        return await this.billService.getAll()
    }


    @Auth({
        action:'delete',
        possession:'any',
        resource:AppResources.BILL
    })
    @ApiOperation({
        summary: 'Delete bill'
    })
    @Delete('delete/:id')
    async deleteBill(@Param('id') id:string, @User() user:IUser) {
        if(
            this.rolesBuilder
                .can(user.roles)
                .deleteAny()
                .granted
        ){
            return await this.billService.deleteBill(id)
        }
    }

    @Auth({
        action:'read',
        possession:'own',
        resource:AppResources.BILL
    })
    @Get('get/one/:id')
    @ApiOperation({
        summary:'Get one'
    })
    async getOne(@Param('id') id:string){
        return await this.billService.getOne(id)
    }


}
