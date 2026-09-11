import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from '@shared/infra/http/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/docs');
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new DomainExceptionFilter());

  const port = process.env.PORT ? Number(process.env.PORT) : 3333;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`API rodando em http://localhost:${port}/docs`);
}
bootstrap();
