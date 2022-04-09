import { Document } from 'mongoose'
export interface ICareer extends Document {
    name:string
    n_semesters:number
    program_director:string
    subjects:string[]
}