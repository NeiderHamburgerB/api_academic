import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsEmail, IsNumber, IsObject, IsString } from "class-validator"


export class UserCreationDto {

    @IsObject()
    @ApiProperty({
        type:{
            type:{type:String},
            value:{type:String}
        }
    })
    document:{
        type:string,
        value:string
    }

    @IsString()
    @ApiProperty({
        type:String
    })
    name:string

    @IsString()
    @ApiProperty({
        type:String
    })
    lastname:string

    @IsEmail()
    @ApiProperty({
        type:String
    })
    email:string
    
    @IsObject()
    @ApiProperty({
        type:{
            prefix:{type:String},
            number:{type:String}
        }
    })
    phone:{
       prefix:string
       number:string
    }

    @IsString()
    @ApiProperty({
        type:String
    })
    password:string
    

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    image?:string
    

    @IsArray()
    @ApiProperty({
        type:Array
    })
    roles:string[]

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    career?:string
    
    @IsNumber()
    @ApiPropertyOptional({
        type:Number
    })
    current_semester?:Number

}