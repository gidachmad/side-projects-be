import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const logger = app.get('NestApplication');

  app.enable('trust proxy');
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ]
  });

  app.use(helmet());
  app.use(compression());

  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Side-Projects-BE')
    .setDescription('The side projects API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3001);
  console.log(`Listening on port ${process.env.PORT}`);
}
bootstrap();
