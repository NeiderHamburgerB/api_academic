import { Schema, Types } from "mongoose"
enum status {
    IN_PROGRESS = 'IN_PROGRESS',
    PASSED = 'PASSED',
    LOST = 'LOST'
}
export const SubjectSchema = new Schema({

    name:{
        type:String
    },
    students:[{
        ref:'User',
        type:Types.ObjectId,
        required:false
    }],
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
    status:[{
        type:String,
        enum: { values: Object.values(status), message:'Use an status valid' }
    }],
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
    timestamps:true,
    versionKey:false
})