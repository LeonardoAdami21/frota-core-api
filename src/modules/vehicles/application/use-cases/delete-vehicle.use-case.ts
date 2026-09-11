import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(private readonly vehicles: VehicleRepository) {}

  async execute(id: string): Promise<void> {
    const vehicle = await this.vehicles.findById(id);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    await this.vehicles.delete(id);
  }
}
