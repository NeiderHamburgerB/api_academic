import { Document } from 'mongoose'

export interface IUser extends Document {

    document:{
        type:string
        value:string
    }
    name:string
    lastname:string
    email:string
    phone:{
       prefix:string
       number:string
    }
    password?:string
    image:string
    roles:string[]
    career:string
    current_semester:number

}

export interface IUserSearch{
    _id?:string,
    document?:string,
    email?:string
}