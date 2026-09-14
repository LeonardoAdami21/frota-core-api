import { Injectable } from '@nestjs/common';
import { FuelingRepository } from '../../domain/repositories/fueling.repository';
import { Fueling } from '../../domain/entities/fueling.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

@Injectable()
export class ListFuelingsUseCase {
  constructor(
    private readonly fuelings: FuelingRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(vehicleId: string): Promise<Fueling[]> {
    await this.vehicles.ensureExists(vehicleId);
    return this.fuelings.findByVehicle(vehicleId);
  }
}
