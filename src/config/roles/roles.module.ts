import { Module } from "@nestjs/common"
import { rolesProvider } from "./roles.provider";

@Module({
    imports:[rolesProvider],
    exports:[rolesProvider]
})
export class RolesModule { }