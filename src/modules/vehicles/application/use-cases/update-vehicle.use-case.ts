import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleStatus } from '../../domain/value-objects/vehicle-status.vo';

interface Input {
  id: string;
  model?: string;
  brand?: string;
  year?: number;
  odometer?: number;
  status?: string;
  driver?: string;
}

@Injectable()
export class UpdateVehicleUseCase {
  constructor(private readonly vehicles: VehicleRepository) {}

  async execute(input: Input): Promise<Vehicle> {
    const vehicle = await this.vehicles.findById(input.id);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');

    vehicle.update({
      model: input.model,
      brand: input.brand,
      year: input.year,
      odometer: input.odometer,
      status: input.status ? VehicleStatus.create(input.status) : undefined,
      driver: input.driver,
    });

    await this.vehicles.save(vehicle);
    return vehicle;
  }
}
