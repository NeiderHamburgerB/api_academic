import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubjectSchema } from 'src/schemas/subject.schema'
import { SubjectController } from './subject.controller'
import { SubjectService } from './subject.service'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Subject',
        schema:SubjectSchema,
        collection:'Subject'
      }
    ])
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
