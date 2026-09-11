import { Vehicle } from '../entities/vehicle.entity';

/**
 * Contrato (porta) do repositório de veículos. Definido no DOMAIN,
 * implementado na INFRA. A aplicação depende desta abstração.
 */
export abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<void>;
  abstract save(vehicle: Vehicle): Promise<void>;
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract findByPlate(plate: string): Promise<Vehicle | null>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract delete(id: string): Promise<void>;
}
