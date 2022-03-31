import { Module } from '@nestjs/common'
import { S3Module } from 'nestjs-s3'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SesModule } from './config/aws/ses/ses.module'
import { SnsModule } from './config/aws/sns/sns.module'
import { DatabaseModule } from './config/database/database.module'
import { EnvironmentModule } from './config/environments/environment.module'

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    S3Module,
    SesModule,
    SnsModule,
    


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
