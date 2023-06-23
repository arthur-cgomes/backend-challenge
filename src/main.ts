import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const packageFile = require('../package.json');
import './envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`API Places`)
    .setDescription('Backend Challenge')
    .setVersion(packageFile.version)
    .addBearerAuth()
    .addTag('Endpoints:')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
