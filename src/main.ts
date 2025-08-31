// Bootstrap function to start the NestJS application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3333); // as 3000 is used by react app 
}
bootstrap();
