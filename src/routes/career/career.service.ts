import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CareerDto } from './dto/career.dto'
import { ICareer } from './interfaces/career.interface'


@Injectable()
export class CareerService {

    constructor(@InjectModel('Career') private career: Model<ICareer>){}

    async create(data:CareerDto): Promise<string>{
        let exists = await this.career.exists({$or:[{name:data.name}]})
        if(exists) throw new NotAcceptableException('Career exists')
        let register = await this.career.create(data)
        await register.save()
        return 'Career created'
    }

    


}
