import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SubjectDto } from './dto/subject.dto'
import { ISubject } from './interfaces/subject.interface'
@Injectable()
export class SubjectService {

    constructor(@InjectModel('Subject') private readonly subject:Model<ISubject>){}

    async getSubjects():Promise<ISubject> {
        return await this.subject
                        .find()
                        .select('-students -status -createdAt -updatedAt')
                        .lean()
    }


    async getStudentsSubjects() {
        return await this.subject
                        .find()
                        .select('-_id -createdAt -updatedAt -status')
                        .populate({path:'students', select:{name:1,lastname:1,email:1, image:1}})
                        .lean()

    }

    async getSubject(id:string): Promise<ISubject> {
        return await this.subject
            .findById(id)
            .select('-students -status -createdAt -updatedAt')
            .lean()
    }

    async updateSubject(id:string,data:any):Promise<string>{
        await this.subject.findByIdAndUpdate(id,data)
        return 'Subject updated'
    }

    async deleteSubject(id:string):Promise<string>{
        await this.subject.findByIdAndDelete(id)
        return 'Subject deleted'
    }

    async createSubject(data:SubjectDto): Promise<string>{
        const exists = await this.subject.exists({$or:[{name:data.name}]}) 
        if(exists) throw new NotAcceptableException('Subject exists')
        let register = await this.subject.create(data)
        register.save()
        return 'Subject created'
    }

   

}
