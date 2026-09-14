import { Expense } from '../../../domain/entities/expense.entity';

export class ExpensePresenter {
  static toHTTP(e: Expense) {
    return {
      id: e.id,
      vehicleId: e.vehicleId,
      category: e.category.toString(),
      description: e.description,
      amount: e.amount,
      spentAt: e.spentAt.toISOString(),
      createdAt: e.createdAt.toISOString(),
    };
  }
}
