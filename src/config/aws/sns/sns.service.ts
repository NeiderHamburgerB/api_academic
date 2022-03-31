import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as AWS from 'aws-sdk'


@Injectable()
export class SnsService {

    private sns:AWS.SNS

    constructor(private config:ConfigService){}

    private setUp = () => {
        return new AWS.SNS({
            accessKeyId: this.config.get('AWS_ACCESS'),
            secretAccessKey: this.config.get('AWS_SECRET'),
            region:'us-east-1'
        })
    }

    send = async (PhoneNumber:string, Message:string):Promise<string> => {

        let { MessageId } = await this.sns.publish({
            PhoneNumber,
            Message
        }).promise()

        return Promise.resolve(MessageId)
    
    }
    
}