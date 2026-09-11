import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

@Injectable()
export class GetVehicleUseCase {
  constructor(private readonly vehicles: VehicleRepository) {}

  async execute(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicles.findById(id);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return vehicle;
  }
}
