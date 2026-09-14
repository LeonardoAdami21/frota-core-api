import { Module } from '@nestjs/common';
import { ExpensesController } from './http/controllers/expenses.controller';
import { CreateExpenseUseCase } from '../application/use-cases/create-expense.use-case';
import { ListExpensesUseCase } from '../application/use-cases/list-expenses.use-case';
import { DeleteExpenseUseCase } from '../application/use-cases/delete-expense.use-case';
import { ExpenseRepository } from '../domain/repositories/expense.repository';
import { PrismaExpenseRepository } from './persistence/prisma/prisma-expense.repository';
import { ExpensesService } from '../application/services/expenses.service';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';

@Module({
  imports: [VehiclesModule], // consome o VehiclesService exportado
  controllers: [ExpensesController],
  providers: [
    CreateExpenseUseCase,
    ListExpensesUseCase,
    DeleteExpenseUseCase,
    ExpensesService,
    { provide: ExpenseRepository, useClass: PrismaExpenseRepository },
  ],
  exports: [ExpensesService],
})
export class ExpensesModule {}
