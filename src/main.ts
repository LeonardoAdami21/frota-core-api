import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from '@shared/infra/http/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new DomainExceptionFilter());

  // ---- Swagger / OpenAPI ----
  const config = new DocumentBuilder()
    .setTitle('FrotaCore API')
    .setDescription(
      'API de gestão de frota — autenticação JWT, usuários e veículos.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('auth', 'Registro e login')
    .addTag('users', 'Usuários')
    .addTag('vehicles', 'Veículos da frota')
    .addTag('maintenances', 'Manutenções por veículo')
    .addTag('fuelings', 'Abastecimentos por veículo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3333;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`API em http://localhost:${port}`);
  console.log(`Swagger em http://localhost:${port}/docs`);
}
bootstrap();
