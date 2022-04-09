import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsNumber, IsString } from "class-validator"

export class CareerDto {

    @IsString()
    @ApiProperty({
        type:String
    })
    name:string

    @IsNumber()
    @ApiProperty({
        type:Number
    })
    n_semesters:number
    
    @IsString()
    @ApiProperty({
        type:String
    })
    program_director:string

    @IsArray()
    @ApiProperty({
        type:Array
    })
    subjects:string[]


}


export class CareerUpdateDto {

    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    name?:string

    @IsNumber()
    @ApiPropertyOptional({
        type:Number
    })
    n_semesters?:number
    
    @IsString()
    @ApiPropertyOptional({
        type:String
    })
    program_director?:string

    @IsArray()
    @ApiPropertyOptional({
        type:Array
    })
    subjects?:string[]

}