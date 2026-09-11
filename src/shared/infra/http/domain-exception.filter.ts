import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@shared/domain/domain.error';

/**
 * Converte erros de domínio (DomainError) em respostas HTTP 400,
 * mantendo o domínio ignorante quanto ao protocolo. Camada: INFRA.
 */
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();

    if (exception instanceof DomainError) {
      res.status(400).json({ statusCode: 400, message: exception.message });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      res.status(status).json(exception.getResponse());
      return;
    }

    // eslint-disable-next-line no-console
    console.error(exception);
    res.status(500).json({ statusCode: 500, message: 'Erro interno' });
  }
}
