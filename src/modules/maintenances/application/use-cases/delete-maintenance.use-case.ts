import { Injectable, NotFoundException } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';

@Injectable()
export class DeleteMaintenanceUseCase {
  constructor(private readonly maintenances: MaintenanceRepository) {}

  async execute(id: string): Promise<void> {
    const found = await this.maintenances.findById(id);
    if (!found) throw new NotFoundException('Manutenção não encontrada');
    await this.maintenances.delete(id);
  }
}
