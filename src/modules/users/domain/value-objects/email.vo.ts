import { DomainError } from '@shared/domain/domain.error';

/**
 * Value Object de Email: encapsula validação e garante que um email
 * inválido nunca exista dentro do domínio. Imutável.
 */
export class Email {
  private static readonly REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase();
    if (!Email.REGEX.test(normalized)) {
      throw new DomainError(`Email inválido: ${raw}`);
    }
    return new Email(normalized);
  }

  toString(): string {
    return this.value;
  }
}
