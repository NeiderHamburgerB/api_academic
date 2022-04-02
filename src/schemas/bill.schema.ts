import { Schema,Types } from 'mongoose'
export const BillSchema = new Schema({

    student:{
        type:Types.ObjectId,
        ref:'User'
    },
    n_order:{
        type:String
    },
    description:{
        type:String
    },
    total:{
        type:String
    }

},{
    timestamps:true
})