import { Expense as PrismaExpense } from '@prisma/client';
import { Expense } from '../../../../domain/entities/expense.entity';
import { ExpenseCategory } from '../../../../domain/value-objects/expense-category.vo';

export class ExpenseMapper {
  static toDomain(raw: PrismaExpense): Expense {
    return Expense.reconstitute(
      {
        vehicleId: raw.vehicleId,
        category: ExpenseCategory.create(raw.category),
        description: raw.description,
        amount: Number(raw.amount),
        spentAt: raw.spentAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(e: Expense) {
    return {
      id: e.id,
      vehicleId: e.vehicleId,
      category: e.category.toString(),
      description: e.description,
      amount: e.amount,
      spentAt: e.spentAt,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
