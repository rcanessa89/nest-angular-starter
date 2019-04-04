import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { getEnvConfig } from '@utils/get-env-config';
import { isDev } from '@utils/is-dev';
import { Configuration } from '@enums/configuration';
import { setSwaggerConfiguration } from './swagger-config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('*.*', express.static('../client-browser'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  console.log('process.env.NODE_ENV =>', process.env.NODE_ENV);
  console.log('isDev() =>', isDev());

  if (isDev()) {
    setSwaggerConfiguration(app);
    app.use(compression());
    app.enableCors();
  }

  app.setGlobalPrefix('api');

  await app.listen(getEnvConfig(Configuration.PORT));
}

bootstrap();
