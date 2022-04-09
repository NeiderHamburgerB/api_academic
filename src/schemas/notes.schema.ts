import { Schema, Types } from "mongoose"

export const NotesSchema = new Schema({

    exam_forty:{
       note_one:{
           type:Number
       },
       note_two:{
           type:Number
       },
       note_three:{
           type:Number
       }
    },
    exam_sixty:{
        note_one:{
            type:Number
        },
        note_two:{
            type:Number
        },
        note_three:{
            type:Number
        }
    },
    student:{
        ref:'User',
        type:Types.ObjectId
    },
    subject:{
        ref:'Subject',
        type:Types.ObjectId
    },
    overall_note:{
        type:Number
    }


},{
    timestamps:true,
    versionKey:false
})