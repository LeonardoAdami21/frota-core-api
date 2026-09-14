import { forwardRef, Module } from '@nestjs/common';
import { MaintenancesController } from './http/controllers/maintenances.controller';
import { CreateMaintenanceUseCase } from '../application/use-cases/create-maintenance.use-case';
import { ListMaintenancesUseCase } from '../application/use-cases/list-maintenances.use-case';
import { DeleteMaintenanceUseCase } from '../application/use-cases/delete-maintenance.use-case';
import { MaintenanceRepository } from '../domain/repositories/maintenance.repository';
import { PrismaMaintenanceRepository } from './persistence/prisma/prisma-maintenance.repository';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';

@Module({
  imports: [forwardRef(() => VehiclesModule)], // consome o VehiclesService exportado
  controllers: [MaintenancesController],
  providers: [
    CreateMaintenanceUseCase,
    ListMaintenancesUseCase,
    DeleteMaintenanceUseCase,
    { provide: MaintenanceRepository, useClass: PrismaMaintenanceRepository },
  ],
})
export class MaintenancesModule {}
