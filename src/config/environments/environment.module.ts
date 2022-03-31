import { Module } from "@nestjs/common"
import { environmentProvider } from "./environment.provider"

@Module({
    imports:[environmentProvider],
    exports:[environmentProvider]
})
export class EnvironmentModule {}