// Bootstrap function to start the NestJS application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // to strip out any properties that are not defined in the DTO
  })); // to use pipes globally for validation
  await app.listen(process.env.PORT ?? 3333); // as 3000 is used by react app 
}
bootstrap();
