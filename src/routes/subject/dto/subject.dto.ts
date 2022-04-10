import { ApiOperation, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"

export class SubjectDto{
    
    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    name?:string

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    students?: string[]

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    schedule?:[{
        day_week:string,
        hour_start:string,
        hour_end:string
    }]

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    lessons?:[{
        title:string,
        content:string,
        images:string[]
    }]

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    forums?:[{
        title:string,
        description:string
    }]

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    status?:string[]

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    homeworks?:[{
        title:string,
        description:string,
        file:string
    }]

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    url_room?:{
        type:String
    }




}