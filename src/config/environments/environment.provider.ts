import { ConfigModule } from "@nestjs/config"
import appEnv from "./env/app.env"

export const environmentProvider =  ConfigModule.forRoot({
    load:[appEnv],
    isGlobal:true
})