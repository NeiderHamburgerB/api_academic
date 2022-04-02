import { Schema, Types } from "mongoose"

export const SubjectSchema = new Schema({

    name:{
        type:String
    },
    user:{
        ref:'User',
        type:Types.ObjectId,
        required:false
    },
    schedule:[{
        day_week:{
            type:String
        },
        hour_start:{
            type:String
        },
        hour_end:{
            type:String
        }
    }],
    lessons:[{
        title:{
            type:String
        },
        content:{
            type:String
        },
        images:[{
            type:String
        }]
    }],
    forums:[{
        title:{
            type:String
        },
        description:{
            type:String
        }
    }],
    status:Boolean,
    homeworks:[{
        title:{
            type:String
        },
        description:{
            type:String
        },
        file:{
            type:String
        }
    }],
    url_room:{
        type:String
    }
},{
    timestamps:true
})