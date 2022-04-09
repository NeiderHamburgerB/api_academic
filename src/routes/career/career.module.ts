import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerSchema } from 'src/schemas/career.schema';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Career',
        schema:CareerSchema,
        collection:'Career'
      }
    ])
  ],
  controllers: [CareerController],
  providers: [CareerService]
})
export class CareerModule {}
