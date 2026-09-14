import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

/**
 * API pública do módulo de veículos para OUTROS módulos.
 * Encapsula o VehicleRepository (detalhe interno) e expõe apenas as
 * operações que outros contextos precisam. Camada: APPLICATION.
 */
@Injectable()
export class VehiclesService {
  constructor(private readonly vehicles: VehicleRepository) {}

  /** Retorna o veículo ou lança NotFound. Usado por outros módulos. */
  async findById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicles.findById(id);
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return vehicle;
  }

  /** Garante que o veículo existe (lança NotFound caso contrário). */
  async ensureExists(id: string): Promise<void> {
    await this.findById(id);
  }

  /** Lista todos os veículos. Usado por leituras cross-module (ex.: dashboard). */
  findAll(): Promise<Vehicle[]> {
    return this.vehicles.findAll();
  }
}
