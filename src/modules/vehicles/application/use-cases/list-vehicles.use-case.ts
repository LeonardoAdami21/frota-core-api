import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

@Injectable()
export class ListVehiclesUseCase {
  constructor(private readonly vehicles: VehicleRepository) {}

  execute(): Promise<Vehicle[]> {
    return this.vehicles.findAll();
  }
}
