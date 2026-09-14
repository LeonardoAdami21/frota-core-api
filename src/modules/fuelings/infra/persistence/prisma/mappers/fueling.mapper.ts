import { Fueling as PrismaFueling } from '@prisma/client';
import { Fueling } from '../../../../domain/entities/fueling.entity';

export class FuelingMapper {
  static toDomain(raw: PrismaFueling): Fueling {
    return Fueling.reconstitute(
      {
        vehicleId: raw.vehicleId,
        liters: Number(raw.liters),
        totalCost: Number(raw.totalCost),
        odometer: raw.odometer,
        fueledAt: raw.fueledAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(f: Fueling) {
    return {
      id: f.id,
      vehicleId: f.vehicleId,
      liters: f.liters,
      totalCost: f.totalCost,
      odometer: f.odometer,
      fueledAt: f.fueledAt,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    };
  }
}
