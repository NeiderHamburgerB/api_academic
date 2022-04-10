import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class BillCreateDto {
    @IsString()
    @ApiProperty({
        type:String
    })
    student: string

    @IsString()
    @ApiProperty({
        type:String
    })
    n_order:string
    
    @IsString()
    @ApiProperty({
        type:String
    })
    description:string

    @IsNumber()
    @ApiProperty({
        type:String
    })
    total:number
}