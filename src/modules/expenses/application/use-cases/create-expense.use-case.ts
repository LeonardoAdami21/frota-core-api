import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../../domain/repositories/expense.repository';
import { Expense } from '../../domain/entities/expense.entity';
import { ExpenseCategory } from '../../domain/value-objects/expense-category.vo';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

interface Input {
  vehicleId: string;
  category: string;
  description: string;
  amount: number;
  spentAt: string;
}

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    private readonly expenses: ExpenseRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(input: Input): Promise<Expense> {
    await this.vehicles.ensureExists(input.vehicleId);

    const expense = Expense.create({
      vehicleId: input.vehicleId,
      category: ExpenseCategory.create(input.category),
      description: input.description,
      amount: input.amount,
      spentAt: new Date(input.spentAt),
    });

    await this.expenses.create(expense);
    return expense;
  }
}
