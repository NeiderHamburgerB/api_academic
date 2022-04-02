import { Schema, Types } from "mongoose"

export const CareerSchema = new Schema({

    name:{
        type:String
    },
    n_semesters:{
        type:String
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
    timestamps:true
})