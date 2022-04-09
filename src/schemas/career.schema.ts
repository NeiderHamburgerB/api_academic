import { Schema, Types } from "mongoose"

export const CareerSchema = new Schema({

    name:{
        type:String
    },
    n_semesters:{
        type:Number
    },
    program_director:{
        type:String
    },
    subjects:[{
        type:Types.ObjectId,
        ref:'Subject',
        required:false
    }]

},{
    timestamps:true,
    versionKey:false
})