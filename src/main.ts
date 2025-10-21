import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configs/swagger-config';
import { HttpExceptionFilter } from './common/consts/exceptions-filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerConfig.setup(app);
  const port = process.env.HTTP_PORT ?? 3000;
  await app.listen(port);
  console.log(`📘 Swagger docs available at: http://localhost:${port}/api-docs`);
}
bootstrap();
