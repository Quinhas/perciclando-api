import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://perciclando.vercel.app',
    methods: '*',
    allowedHeaders: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(env.port, '0.0.0.0');
}
bootstrap();
