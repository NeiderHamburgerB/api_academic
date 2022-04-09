import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserCreationDto, UserUpdateDto } from './dtos/user.dto'
import { IUser, IUserSearch } from './interfaces/user.interface'
import { hashSync, genSaltSync } from 'bcryptjs'

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private user:Model<IUser>){}

    async getAll() : Promise<IUser[]>{
        return await this.user
                        .find({})
                        .select('-password -createdAt -updatedAt')
                        .populate({path:'career', select: {name:1, _id:0} })
    }
    
    async getUser (data:IUserSearch , watch:boolean) :Promise<IUser> {
        return await this.user
            .findOne(data)
            .select(`${watch ? '': '-password'} -createdAt -updatedAt`)
            .populate({path:'career', select: {name:1, _id:0} })
            .lean()
    }

   async getUsersByRoles(role:string) :Promise<IUser[]>{
        return await this.user.find({roles:[role]}).select('-career -password -createdAt -updatedAt -createdAt -roles')
   }

    async getUsersCareer(careerId:string) {
        return await this.user
                        .find()
                        .select('-password -createdAt -updatedAt -career -roles')
                        .where({career:[careerId]}) 
                        .lean()
    }

    async getTotalUsersCareers(){

        return await this.user.aggregate([
            {
               '$lookup':{
                    'from':'Career',
                    'localField':'career',
                    'foreignField':'_id',
                    'as':'career'
                }
            },
            {
                '$group':{
                    '_id':'$career.name',
                    'totalEstudiantes':{$sum:1}
                }
            },
        ])

    }

    async updateUser(userId:string,data:UserUpdateDto, user?:IUser ):Promise<string> {
        if(user?._id != userId){
            throw new NotAcceptableException('You are not allowed')
        }  
        await this.user.findByIdAndUpdate(userId,data)
        
        return 'User updated'
    }

    async deleteUser(userId:string, user?:IUser):Promise<string> {
        if(user._id != userId){
            throw new NotAcceptableException('You are not allowed')
        }
        await this.user.findByIdAndDelete(userId)

        return 'User Deleted'
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
