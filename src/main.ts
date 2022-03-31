import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
declare const module: any
import * as Auth from 'express-basic-auth'
import { SwaggerInit } from './app.swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  app.use('/api/docs', Auth({
    challenge:true,
    users:{hamburger: `${process.env.PASSWORD_SWAGGER}`}
  }))

  SwaggerInit(app)

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

}
bootstrap()
