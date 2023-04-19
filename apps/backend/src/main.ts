import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Endpoint rest api')
    .setDescription('The rest API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser('sdhushdishudishhsdsui'));
  app.enableCors({
    allowedHeaders: '*',
    origin: ['http://localhost:8080'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
