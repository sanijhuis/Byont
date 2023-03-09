import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //4000 is a temporary port
  await app.listen(4000);
}
bootstrap();
