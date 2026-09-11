import { Maintenance as PrismaMaintenance } from '@prisma/client';
import { Maintenance } from '../../../../domain/entities/maintenance.entity';

export class MaintenanceMapper {
  static toDomain(raw: PrismaMaintenance): Maintenance {
    return Maintenance.reconstitute(
      {
        vehicleId: raw.vehicleId,
        description: raw.description,
        cost: Number(raw.cost),
        odometer: raw.odometer,
        performedAt: raw.performedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(m: Maintenance) {
    return {
      id: m.id,
      vehicleId: m.vehicleId,
      description: m.description,
      cost: m.cost,
      odometer: m.odometer,
      performedAt: m.performedAt,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    };
  }
}
