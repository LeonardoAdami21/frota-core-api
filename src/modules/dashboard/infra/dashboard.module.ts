import { Module } from '@nestjs/common';
import { DashboardController } from './http/controllers/dashboard.controller';
import { GetDashboardUseCase } from '../application/get-dashboard.use-case';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';
import { MaintenancesModule } from '@modules/maintenances/infra/maintenances.module';
import { FuelingsModule } from '@modules/fuelings/infra/fuelings.module';
import { ExpensesModule } from '@modules/expenses/infra/expenses.module';
import { DocumentsModule } from '@modules/documents/infra/documents.module';

@Module({
  imports: [VehiclesModule, MaintenancesModule, FuelingsModule, ExpensesModule, DocumentsModule],
  controllers: [DashboardController],
  providers: [GetDashboardUseCase],
})
export class DashboardModule {}
