import { NestFactory } from '@nestjs/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { env } from '@infra/config/env';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.listen(env.PORT, '0.0.0.0');

  const url = await app.getUrl();

  // eslint-disable-next-line no-console
  console.log(`[Api] Application is running on ${url}`);
}
bootstrap();
