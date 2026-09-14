import { Injectable } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

@Injectable()
export class ListMaintenancesUseCase {
  constructor(
    private readonly maintenances: MaintenanceRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    await this.vehicles.ensureExists(vehicleId);
    return this.maintenances.findByVehicle(vehicleId);
  }
}
