import { Injectable } from "@nestjs/common"
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from "src/routes/auth/auth.service"

@Injectable()
export class LocalStrategie extends PassportStrategy(Strategy) {

    constructor(private authService:AuthService){
        super({
            usernameField:'email',
            passwordField:'password'
        })
    }

    async validate(email:string,password:string){
        return await this.authService.valid(email,password)
    }

}