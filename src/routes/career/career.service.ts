import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CareerDto, CareerUpdateDto } from './dto/career.dto'
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

    async getCareers():Promise<ICareer[]> {
        return await this.career
                        .find()
                        .select('-createdAt -updatedAt -_id')
                        .populate({path:'subjects', select:{ name:1, _id:1 }})
    }

    async getCareer(id:string): Promise<ICareer>{
        return await this.career
                        .findById(id)
                        .select('-createdAt -updatedAt -_id')
                        .populate({path:'subjects', select:{ name:1, _id:0 }})
    }

    async updateCareer(id:string, data:CareerUpdateDto):Promise<string>{
        await this.career.findByIdAndUpdate(id,data)
        return 'Career update'
    }

    async deleteCareer(id:string): Promise<string> {
        await this.career.findByIdAndDelete(id)
        return 'Career delete'
    }

}
