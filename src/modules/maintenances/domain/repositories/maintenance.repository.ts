import { Maintenance } from '../entities/maintenance.entity';

export abstract class MaintenanceRepository {
  abstract create(maintenance: Maintenance): Promise<void>;
  abstract findById(id: string): Promise<Maintenance | null>;
  abstract findByVehicle(vehicleId: string): Promise<Maintenance[]>;
  abstract delete(id: string): Promise<void>;
}
