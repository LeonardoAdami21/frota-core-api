import { DomainError } from '@shared/domain/domain.error';

export type ExpenseCategoryValue =
  | 'PNEUS' | 'PEDAGIO' | 'LAVAGEM' | 'MULTA' | 'ESTACIONAMENTO' | 'OUTROS';

/** Categoria de despesa, restrita a um conjunto fechado. */
export class ExpenseCategory {
  private static readonly VALIDOS: ExpenseCategoryValue[] = [
    'PNEUS', 'PEDAGIO', 'LAVAGEM', 'MULTA', 'ESTACIONAMENTO', 'OUTROS',
  ];
  private readonly value: ExpenseCategoryValue;

  private constructor(value: ExpenseCategoryValue) {
    this.value = value;
  }

  static create(raw: string): ExpenseCategory {
    const v = raw.toUpperCase() as ExpenseCategoryValue;
    if (!ExpenseCategory.VALIDOS.includes(v)) {
      throw new DomainError(`Categoria inválida: ${raw}`);
    }
    return new ExpenseCategory(v);
  }

  toString(): ExpenseCategoryValue {
    return this.value;
  }
}
