import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';
import { jwtMiddleware } from './middleware/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Endpoint rest api')
    .setDescription('The rest API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors({
    allowedHeaders: 'Content-Type, Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: ['http://localhost:8080'],
    credentials: true,
  });
  app.use(cookieParser('cookieSecret'));
  app.use(jwtMiddleware(app.get(JwtService)));
  await app.listen(3000);
}
bootstrap();
