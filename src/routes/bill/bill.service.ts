import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BillCreateDto } from './dto/bill.dto'
import { IBill } from './interfaces/bill.interface'
@Injectable()
export class BillService {

    constructor(@InjectModel('Bill') private readonly bill: Model<IBill>){}

    async create(data:BillCreateDto): Promise<string> {
        let exists = await this.bill.exists({$or:[{n_order:data.n_order}]})
        if(exists) throw new NotAcceptableException('Bill exists')
        let register = await this.bill.create(data)
        await register.save()
        return 'Bill created'
    }

    async getAll(): Promise<IBill[]> {
        return await this.bill
                        .find()
                        .select('-createdAt -updatedAt')
                        .populate({path:'student', select:{document:1, name:1, lastname:1, email:1}})
    }

    async deleteBill(id:string):Promise<string>{
        await this.bill.findByIdAndDelete(id)
        return 'Bill deleted'
    }

    async getOne(id:string){
        return await this.bill
            .findById(id)
            .select('-createdAt -updatedAt')
            .populate({path:'student', select:{document:1, name:1, lastname:1, email:1}})        
    }


}
