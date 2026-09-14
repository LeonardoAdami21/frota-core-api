import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseRepository } from '../../domain/repositories/expense.repository';

@Injectable()
export class DeleteExpenseUseCase {
  constructor(private readonly expenses: ExpenseRepository) {}

  async execute(id: string): Promise<void> {
    const found = await this.expenses.findById(id);
    if (!found) throw new NotFoundException('Despesa não encontrada');
    await this.expenses.delete(id);
  }
}
