import { Injectable } from '@nestjs/common';
import { FuelingRepository } from '../../domain/repositories/fueling.repository';
import { Fueling } from '../../domain/entities/fueling.entity';

/**
 * API pública do módulo de abastecimentos para OUTROS módulos.
 * Encapsula o FuelingRepository (detalhe interno). Camada: APPLICATION.
 */
@Injectable()
export class FuelingsService {
  constructor(private readonly fuelings: FuelingRepository) {}

  findByVehicle(vehicleId: string): Promise<Fueling[]> {
    return this.fuelings.findByVehicle(vehicleId);
  }
}
