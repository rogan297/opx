import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: ['http://192.168.1.10:4000', 'http://localhost:4000', 'http://0.0.0.0:4000'], // URL do seu frontend Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Necessário se você for usar cookies ou sessões complexas
  });

  const config = new DocumentBuilder()
    .setTitle('OPX System')
    .setDescription('A kds system')
    .setVersion('0.1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
