import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { S3Module } from 'src/config/aws/s3/s3.module'
import { UserSchema } from 'src/schemas/user.schema'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports:[
    S3Module,
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema,
        collection:'User'
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
