import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const SwaggerInit = (app:INestApplication) => {

    const config = new DocumentBuilder()
        .setTitle('API ACADEMIC')
        .setDescription('Nest is framework amazing ♡♥')
        .setVersion('0.1')
        .addBearerAuth()
        .build()
    
    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api/docs',app, document,{
        customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-material.css'
    })

}