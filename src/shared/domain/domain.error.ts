/**
 * Erro de regra de negócio, lançado pelo domínio/aplicação.
 * A camada de infra (HTTP) traduz para o status code adequado.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}
