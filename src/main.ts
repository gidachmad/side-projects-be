import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const logger = app.get('');

  app.enable('trust proxy');
  app.enableCors();

  app.use(helmet());
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Side-Projects-BE')
    .setDescription('The side projects API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.BACKEND_PORT || 4200);
  console.log(`Listening on port ${process.env.BACKEND_PORT}`);
}
bootstrap();
