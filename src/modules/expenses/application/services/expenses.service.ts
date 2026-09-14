import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../../domain/repositories/expense.repository';
import { Expense } from '../../domain/entities/expense.entity';

/**
 * API pública do módulo de despesas para OUTROS módulos.
 * Encapsula o ExpenseRepository (detalhe interno). Camada: APPLICATION.
 */
@Injectable()
export class ExpensesService {
  constructor(private readonly expenses: ExpenseRepository) {}

  findByVehicle(vehicleId: string): Promise<Expense[]> {
    return this.expenses.findByVehicle(vehicleId);
  }
}
