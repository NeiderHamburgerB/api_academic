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

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    career?:string[]
    
    @IsNumber()
    @ApiPropertyOptional({
        type:Number
    })
    current_semester?:Number

}

export class LoginDto {
    
    @IsEmail()
    @ApiProperty({
        type:String
    })
    email:string

    @IsString()
    @ApiProperty({
        type:String
    })
    password:string

}


export class UserUpdateDto {

    @IsObject()
    @ApiPropertyOptional({
        type:{
            type:{type:String},
            value:{type:String}
        }
    })
    document?:{
        type?:string,
        value?:string
    }

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    name?:string

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    lastname?:string

    @IsEmail()
    @ApiPropertyOptional({
        type:String
    })
    email?:string
    
    @IsObject()
    @ApiPropertyOptional({
        type:{
            prefix:{type:String},
            number:{type:String}
        }
    })
    phone?:{
       prefix?:string
       number?:string
    }

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    password?:string
    
    
    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    career?:string[]
    
    @IsNumber()
    @ApiPropertyOptional({
        type:Number
    })
    current_semester?:Number

}