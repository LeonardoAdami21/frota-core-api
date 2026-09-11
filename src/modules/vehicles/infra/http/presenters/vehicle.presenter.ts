import { Vehicle } from '../../../domain/entities/vehicle.entity';

export class VehiclePresenter {
  static toHTTP(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      plate: vehicle.plate.toString(),
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      odometer: vehicle.odometer,
      status: vehicle.status.toString(),
      driver: vehicle.driver,
      createdAt: vehicle.createdAt.toISOString(),
      updatedAt: vehicle.updatedAt.toISOString(),
    };
  }
}
