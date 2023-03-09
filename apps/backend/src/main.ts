import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //5000 is a temporary port
  await app.listen(5000);
}
bootstrap();
