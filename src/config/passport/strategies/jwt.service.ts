import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserService } from "src/routes/user/user.service"

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy){

    constructor(private config:ConfigService, private userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:config.get('JWT_SECRET')
        })
    }

    async validate(payload:any){
        const { sub : _id } = payload
        return await this.userService.getUser({_id}, false)
    }

    
}