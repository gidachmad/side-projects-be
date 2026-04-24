import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const logger = app.get('NestApplication');

  app.enable('trust proxy');
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ]
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  app.use(helmet());
  app.use(compression());

  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Side-Projects-BE')
    .setDescription(`
      This is BackEnd for Regid's Side Projects, It's intended to be used as a backend for multiple of side projects, it contains multiple APIs that are used for different side projects APPs. 
      
      Check github repo for more details: https://github.com/gidachmad/side-projects-be`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3001);
  console.log(`Listening on port ${process.env.PORT}`);
}
bootstrap();
