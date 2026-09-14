import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';
import { ExpenseCategory } from '../value-objects/expense-category.vo';

export interface ExpenseProps {
  vehicleId: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  spentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Despesa avulsa de um veículo (pedágio, multa, pneus etc.). Camada: DOMAIN. */
export class Expense extends Entity<ExpenseProps> {
  private constructor(props: ExpenseProps, id?: string) {
    super(props, id);
  }

  static create(
    input: {
      vehicleId: string;
      category: ExpenseCategory;
      description: string;
      amount: number;
      spentAt: Date;
    },
    id?: string,
  ): Expense {
    if (input.description.trim().length < 2) {
      throw new DomainError('Descrição deve ter ao menos 2 caracteres');
    }
    if (input.amount < 0) throw new DomainError('Valor não pode ser negativo');

    const now = new Date();
    return new Expense(
      {
        vehicleId: input.vehicleId,
        category: input.category,
        description: input.description.trim(),
        amount: input.amount,
        spentAt: input.spentAt,
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  static reconstitute(props: ExpenseProps, id: string): Expense {
    return new Expense(props, id);
  }

  get vehicleId(): string { return this.props.vehicleId; }
  get category(): ExpenseCategory { return this.props.category; }
  get description(): string { return this.props.description; }
  get amount(): number { return this.props.amount; }
  get spentAt(): Date { return this.props.spentAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
