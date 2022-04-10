import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BillSchema } from 'src/schemas/bill.schema'
import { BillController } from './bill.controller'
import { BillService } from './bill.service'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Bill',
        schema: BillSchema,
        collection:'Bill'
      }
    ])
  ],
  controllers: [BillController],
  providers: [BillService]
})
export class BillModule {}
