import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://perciclando-ingressos.vercel.app',
    methods: '*',
    allowedHeaders: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (!process.env.PORT) {
    throw new Error('Port must be specified');
  }

  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
