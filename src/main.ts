import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { join } from 'path';
import { AppModule } from './app.module';

const BASE_PATH = process.env.BASE_PATH ?? '';
const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = parseInt(process.env.PORT ?? '3000', 10);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(BASE_PATH);
  app.enableCors({ origin: true, methods: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  if (NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${BASE_PATH}/docs`, app, document);
  }

  await app.listen(PORT);
}
void bootstrap();
