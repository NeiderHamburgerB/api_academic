import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { compareSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../user/interfaces/user.interface'

@Injectable()
export class AuthService {

    constructor(private UserService:UserService, private jwtService:JwtService){}

    async valid (email:string, pass:string) {
        let user = await this.UserService.getUser({email},true)
        if(!user) throw new NotFoundException('User not exists')
        if(!compareSync(pass,user.password)) throw new NotAcceptableException('User or password incorrect')
        let { password,...rest} = user
        return rest
    }

    login (user: IUser) {
        const { _id } = user
        const payload = { sub:_id }
        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }



}
