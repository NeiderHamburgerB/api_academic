import { Module } from '@nestjs/common'
import { LocalStrategie } from 'src/config/passport/strategies/local.service'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { JwtStrategie } from 'src/config/passport/strategies/jwt.service';
import { PassportModule } from 'src/config/passport/passport.module';

@Module({
  imports:[
    UserModule,
    PassportModule
  ],
  providers: [AuthService, LocalStrategie, JwtStrategie],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
