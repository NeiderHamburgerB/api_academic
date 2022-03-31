import { Injectable } from "@nestjs/common"
import * as AWS from 'aws-sdk'
import { ConfigService } from "@nestjs/config"
import * as mailcomposer from 'mailcomposer'
import { PromiseResult } from "aws-sdk/lib/request"


@Injectable()
export class SesService {
    
    private ses:AWS.SES


    constructor(private config: ConfigService){
        this.ses = this.setUp()
    }


    private setUp = () => {
        return new AWS.SES({
            accessKeyId: this.config.get('AWS_ACCESS'),
            secretAccessKey: this.config.get('AWS_SECRET'),
            region: 'us-east-1'
        })
    }

    send = async (to:string[], subject:string='', html?:string ):Promise<string> => {

        const { MessageId }  = await this.ses.sendEmail({
            Destination:{
                ToAddresses:to
            },
            Message:{
                Body:{
                    Html:{
                        Data:html,
                        Charset:'utf-8'
                    }
                },
                Subject:{
                    Data:subject,
                    Charset:'utf-8'
                }
            },
            Source: this.config.get('AWS_EMAIL')

        }).promise()

        return Promise.resolve(MessageId)

    }

    sendFile = ( to:string[], subject:string='', data:{filename:string, path:string} ,html?:string):Promise<string> => {
        
        const mail = mailcomposer({
            to,
            subject,
            html,
            attachments:[data],
            from: this.config.get('AWS_EMAIL')
        })

        return new Promise((reject, resolve)=>{
            let sendMail: Promise<PromiseResult<AWS.SES.SendRawEmailResponse, AWS.AWSError>>  
            mail.build((err, message)=>{
                if(err) throw new err
                sendMail = this.ses.sendRawEmail({
                    RawMessage:{
                        Data: message
                    }
                }).promise()
            })
            resolve(sendMail)
        }) 

    }



}