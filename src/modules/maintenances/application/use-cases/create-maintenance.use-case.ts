import { Injectable, NotFoundException } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { VehicleRepository } from '@modules/vehicles/domain/repositories/vehicle.repository';

interface Input {
  vehicleId: string;
  description: string;
  cost: number;
  odometer: number;
  performedAt: string;
}

@Injectable()
export class CreateMaintenanceUseCase {
  constructor(
    private readonly maintenances: MaintenanceRepository,
    private readonly vehicles: VehicleRepository,
  ) {}

  async execute(input: Input): Promise<Maintenance> {
    const vehicle = await this.vehicles.findById(input.vehicleId);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');

    const maintenance = Maintenance.create({
      vehicleId: input.vehicleId,
      description: input.description,
      cost: input.cost,
      odometer: input.odometer,
      performedAt: new Date(input.performedAt),
    });

    await this.maintenances.create(maintenance);
    return maintenance;
  }
}
