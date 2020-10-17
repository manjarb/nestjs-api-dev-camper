import { config } from 'dotenv';
// Load env vars
config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { FormatResponseInterceptor } from './interceptors/format-response/format-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Enforcing validation rules for all incoming client payloads
  app.useGlobalPipes(
    new ValidationPipe({
      // White list only acceptable payload
      whitelist: true,
      forbidNonWhitelisted: true,
      // Enabling auto transform body type of payload
      // Might impact some performance
      // transform: true,
      // To remove  @Type(() => Number) from PaginationQueryDto
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Catch Http error ex. find non-exist :id -1
  app.useGlobalFilters(new HttpExceptionFilter());

  // Add interceptor to modify response
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('NestJs DevCamper')
    .setDescription('Sample bootcamp app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
