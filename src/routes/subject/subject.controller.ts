import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { AppResources } from 'src/app.roles'
import { Auth } from 'src/config/decorators/auth.decorator'
import { User } from 'src/config/decorators/user.decorator'
import { IUser } from '../user/interfaces/user.interface'
import { SubjectDto } from './dto/subject.dto'
import { SubjectService } from './subject.service'

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {

    constructor(private subjectService:SubjectService, 
                @InjectRolesBuilder() private RolesBuilder:RolesBuilder){}
    
    @Auth({
        possession:'any',
        action:'read',
        resource:AppResources.SUBJECT
    })   
    @Get('get/all')
    @ApiOperation({
        summary:'Get all'
    })
    async getSubjects(){
        return await this.subjectService.getSubjects()
    }      

    @Auth({
        possession:'own',
        action:'read',
        resource:AppResources.SUBJECT
    })            
    @Get('get/students')
    @ApiOperation({
        summary:'Get students of subjects'
    })
    async getStudentsSubjects(){
        return await this.subjectService.getStudentsSubjects()
    }

    @Auth({
        possession:'own',
        action:'read',
        resource:AppResources.SUBJECT
    })            
    @Get('get/subject/:id')
    @ApiOperation({
        summary:'Get subjects by id'
    })
    async getSubject(@Param('id') id:string ){
        return await this.subjectService.getSubject(id)
    }

    @Auth({
        possession:'any',
        action:'update',
        resource:AppResources.SUBJECT
    })            
    @Put('update/subject/:id')
    @ApiOperation({
        summary:'Update subject by id'
    })
    async updateSubject(@Param('id') id:string, data:SubjectDto, @User() user:IUser ){
        if(this.RolesBuilder
            .can(user.roles)
            .updateAny()
            .granted
            ){
                return await this.subjectService.updateSubject(id,data)
            }
    }

    @Auth({
        possession:'any',
        action:'delete',
        resource:AppResources.SUBJECT
    })            
    @Delete('delete/subject/:id')
    @ApiOperation({
        summary:'Delete subject by id'
    })
    async deleteSubject(@Param('id') id:string,@User() user:IUser){
        if(this.RolesBuilder
            .can(user.roles)
            .updateAny()
            .granted
            ){
                return await this.subjectService.deleteSubject(id)
            }
    }

    @Auth({
        possession:'any',
        action:'create',
        resource:AppResources.SUBJECT
    })  
    @Post('create')
    @ApiOperation({
        summary: 'Create subject'
    }) 
    async createSubject(@Body() data:SubjectDto ){
        return await this.subjectService.createSubject(data)
    }


}
