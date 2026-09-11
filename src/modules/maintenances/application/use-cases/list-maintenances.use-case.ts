import { Injectable, NotFoundException } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { VehicleRepository } from '@modules/vehicles/domain/repositories/vehicle.repository';

@Injectable()
export class ListMaintenancesUseCase {
  constructor(
    private readonly maintenances: MaintenanceRepository,
    private readonly vehicles: VehicleRepository,
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    const vehicle = await this.vehicles.findById(vehicleId);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return this.maintenances.findByVehicle(vehicleId);
  }
}
