import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserCreationDto } from './dtos/user.dto'
import { IUser, IUserSearch } from './interfaces/user.interface'
import { hashSync, genSaltSync } from 'bcryptjs'

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private user:Model<IUser>){}

    async getUser (data:IUserSearch, watch:boolean) {
        return await this.user
            .findOne(data)
            .select(`${watch ? '': '-password'} -createdAt -updatedAt`)
            .lean()
    }

    async createUser(data:UserCreationDto) : Promise<string> {
        let user = await this.user.exists({
            $or:[{email:data.email},{'document.value':data.document.value}]
        })
        if(user) throw new NotAcceptableException('User exists')
        data.password = this.hashPassword(data.password)
        let register = await this.user.create(data)
        await register.save()

        return 'User created'
    }

    hashPassword = (password:string) => {
        return hashSync(password, genSaltSync(8))
    }
   





}
