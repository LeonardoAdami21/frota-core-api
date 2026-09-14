import { Fueling } from '../entities/fueling.entity';

export abstract class FuelingRepository {
  abstract create(fueling: Fueling): Promise<void>;
  abstract findById(id: string): Promise<Fueling | null>;
  abstract findByVehicle(vehicleId: string): Promise<Fueling[]>;
  abstract delete(id: string): Promise<void>;
}
