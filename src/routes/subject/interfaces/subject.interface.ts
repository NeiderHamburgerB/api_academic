import { Document } from 'mongoose'
export interface ISubject extends Document{
    name:string
    students?:string[]
    schedule?:[{
        day_week:string,
        hour_start:string,
        hour_end:string
    }]
    lessons?:[{
        title:string,
        content:string,
        images:string[]
    }]
    forums?:[{
        title:string,
        description:string
    }],
    status?:string[]
    homeworks?:[{
        title:string,
        description:string,
        file:string
    }]
    url_room:string
}