import { Injectable } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

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
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(input: Input): Promise<Maintenance> {
    await this.vehicles.ensureExists(input.vehicleId);

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
