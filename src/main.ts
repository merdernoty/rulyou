import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './common/filtres/all-exceptions.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle('Cервис управления пользователями RULYOU')
    .setDescription('API для управления пользователями')
    .setVersion('1.0')
    .addTag('users', 'Операции с пользователями')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'RULYOU Users API',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
  });
  app.enableCors();

  const port = process.env.APP_PORT || 3000;

  await app.listen(port, () => {
    Logger.log(`Сервер запущен на порту ${port}`);
    Logger.log(`Документация Swagger доступна по адресу: http://localhost:${port}/api/docs`);
  });
}

bootstrap();
