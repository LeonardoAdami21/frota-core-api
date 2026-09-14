import { Injectable } from '@nestjs/common';
import { FuelingRepository } from '../../domain/repositories/fueling.repository';
import { Fueling } from '../../domain/entities/fueling.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

interface Input {
  vehicleId: string;
  liters: number;
  totalCost: number;
  odometer: number;
  fueledAt: string;
}

@Injectable()
export class CreateFuelingUseCase {
  constructor(
    private readonly fuelings: FuelingRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(input: Input): Promise<Fueling> {
    await this.vehicles.ensureExists(input.vehicleId);

    const fueling = Fueling.create({
      vehicleId: input.vehicleId,
      liters: input.liters,
      totalCost: input.totalCost,
      odometer: input.odometer,
      fueledAt: new Date(input.fueledAt),
    });

    await this.fuelings.create(fueling);
    return fueling;
  }
}
