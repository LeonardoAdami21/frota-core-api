import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../../domain/repositories/expense.repository';
import { Expense } from '../../domain/entities/expense.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

@Injectable()
export class ListExpensesUseCase {
  constructor(
    private readonly expenses: ExpenseRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(vehicleId: string): Promise<Expense[]> {
    await this.vehicles.ensureExists(vehicleId);
    return this.expenses.findByVehicle(vehicleId);
  }
}
