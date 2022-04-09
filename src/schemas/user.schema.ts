import { Schema, Types } from "mongoose"
import { AppRoles } from "src/app.roles"

export const UserSchema = new Schema({

   document:{
       type:{
           type:String
       },
       value:{
           type:String
       }
   },
   name:{
       type:String
   },
   lastname:{
       type:String
   },
   email:{
       type:String
   },
   phone:{
      prefix:{
          type:String
      },
      number:{
          type:String
      }
   },
   password:{
       type:String
   },
   image:{
       type:String
   },
   roles:[{
       type:String,
       enum: {values: Object.values(AppRoles) ,message:'Use an role valid'}
   }],
   career:[{
       ref:'Career',
       type:Types.ObjectId,
       required:false
   }],
   current_semester:{
       required:false,
       type:Number
   }
},{
    timestamps:true,
    versionKey:false
})