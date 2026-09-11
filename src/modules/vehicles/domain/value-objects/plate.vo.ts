import { DomainError } from '@shared/domain/domain.error';

/**
 * Value Object de Placa. Aceita o padrão antigo (ABC-1234) e o
 * Mercosul (ABC1D23). Normaliza para maiúsculas sem hífen.
 */
export class Plate {
  private static readonly ANTIGA = /^[A-Z]{3}[0-9]{4}$/;
  private static readonly MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): Plate {
    const v = raw.replace(/[\s-]/g, '').toUpperCase();
    if (!Plate.ANTIGA.test(v) && !Plate.MERCOSUL.test(v)) {
      throw new DomainError(`Placa inválida: ${raw}`);
    }
    return new Plate(v);
  }

  toString(): string {
    return this.value;
  }
}
