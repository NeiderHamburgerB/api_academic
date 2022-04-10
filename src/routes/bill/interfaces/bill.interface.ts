import { Document } from 'mongoose'
export interface IBill extends Document {
    student: string
    n_order:string
    description:string
    total:number
}