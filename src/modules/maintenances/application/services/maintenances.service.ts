import { Injectable } from '@nestjs/common';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';

/**
 * API pública do módulo de manutenções para OUTROS módulos.
 * Encapsula o MaintenanceRepository (detalhe interno). Camada: APPLICATION.
 */
@Injectable()
export class MaintenancesService {
  constructor(private readonly maintenances: MaintenanceRepository) {}

  findByVehicle(vehicleId: string): Promise<Maintenance[]> {
    return this.maintenances.findByVehicle(vehicleId);
  }
}
