import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.init());
  const allowedOrigins = process.env.CORS_ALLOW_ORIGINS || 'http://localhost:4200';
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
