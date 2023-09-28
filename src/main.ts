import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerDocument } from './swagger.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Documentation
  SwaggerDocument.swaggerSetup(app);

  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
