import { Expense } from '../entities/expense.entity';

export abstract class ExpenseRepository {
  abstract create(expense: Expense): Promise<void>;
  abstract findById(id: string): Promise<Expense | null>;
  abstract findByVehicle(vehicleId: string): Promise<Expense[]>;
  abstract delete(id: string): Promise<void>;
}
