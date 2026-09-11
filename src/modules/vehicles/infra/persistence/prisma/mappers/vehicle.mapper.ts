import { Vehicle as PrismaVehicle } from '@prisma/client';
import { Vehicle } from '../../../../domain/entities/vehicle.entity';
import { Plate } from '../../../../domain/value-objects/plate.vo';
import { VehicleStatus } from '../../../../domain/value-objects/vehicle-status.vo';

/** Traduz entre o modelo Prisma e a entidade de domínio Vehicle. */
export class VehicleMapper {
  static toDomain(raw: PrismaVehicle): Vehicle {
    return Vehicle.reconstitute(
      {
        plate: Plate.create(raw.plate),
        model: raw.model,
        brand: raw.brand,
        year: raw.year,
        odometer: raw.odometer,
        status: VehicleStatus.create(raw.status),
        driver: raw.driver,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      plate: vehicle.plate.toString(),
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      odometer: vehicle.odometer,
      status: vehicle.status.toString(),
      driver: vehicle.driver,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }
}
