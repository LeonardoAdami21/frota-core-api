import { Fueling } from '../../../domain/entities/fueling.entity';

export class FuelingPresenter {
  static toHTTP(f: Fueling) {
    return {
      id: f.id,
      vehicleId: f.vehicleId,
      liters: f.liters,
      totalCost: f.totalCost,
      pricePerLiter: f.pricePerLiter,
      odometer: f.odometer,
      fueledAt: f.fueledAt.toISOString(),
      createdAt: f.createdAt.toISOString(),
    };
  }
}
