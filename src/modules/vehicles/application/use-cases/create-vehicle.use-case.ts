import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { Plate } from '../../domain/value-objects/plate.vo';
import { VehicleStatus } from '../../domain/value-objects/vehicle-status.vo';
import { DomainError } from '@shared/domain/domain.error';

interface Input {
  plate: string;
  model: string;
  brand: string;
  year: number;
  odometer: number;
  status: string;
  driver?: string;
}

@Injectable()
export class CreateVehicleUseCase {
  constructor(private readonly vehicles: VehicleRepository) {}

  async execute(input: Input): Promise<Vehicle> {
    const plate = Plate.create(input.plate);

    const existing = await this.vehicles.findByPlate(plate.toString());
    if (existing) {
      throw new DomainError('Já existe um veículo com esta placa');
    }

    const vehicle = Vehicle.create({
      plate,
      model: input.model,
      brand: input.brand,
      year: input.year,
      odometer: input.odometer,
      status: VehicleStatus.create(input.status),
      driver: input.driver,
    });

    await this.vehicles.create(vehicle);
    return vehicle;
  }
}
