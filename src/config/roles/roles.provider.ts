import { AccessControlModule } from "nest-access-control"
import { roles } from "src/app.roles"

export const rolesProvider = AccessControlModule.forRoles(roles)