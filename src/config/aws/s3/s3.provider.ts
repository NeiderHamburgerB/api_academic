import { ConfigModule, ConfigService } from "@nestjs/config"
import { S3Module } from "nestjs-s3"

export const s3Provider = [
    S3Module.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory : async (config:ConfigService) => ({
            config: {
                accessKeyId: config.get('AWS_ACCESS'),
                secretAccessKey: config.get('AWS_SECRET'),
                s3ForcePathStyle:true
            }
        })
    })   
]