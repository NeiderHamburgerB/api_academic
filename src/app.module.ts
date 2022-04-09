import { Module } from '@nestjs/common'
import { S3Module } from 'nestjs-s3'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SesModule } from './config/aws/ses/ses.module'
import { SnsModule } from './config/aws/sns/sns.module'
import { DatabaseModule } from './config/database/database.module'
import { EnvironmentModule } from './config/environments/environment.module'
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './routes/auth/auth.module';
import { roles } from './app.roles'
import { RolesModule } from './config/roles/roles.module'
import { CareerModule } from './routes/career/career.module';
import { SubjectModule } from './routes/subject/subject.module';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    S3Module,
    SesModule,
    SnsModule,
    UserModule,
    AuthModule,
    RolesModule,
    CareerModule,
    SubjectModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
