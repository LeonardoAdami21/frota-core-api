import { Maintenance } from '../../../domain/entities/maintenance.entity';

export class MaintenancePresenter {
  static toHTTP(m: Maintenance) {
    return {
      id: m.id,
      vehicleId: m.vehicleId,
      description: m.description,
      cost: m.cost,
      odometer: m.odometer,
      performedAt: m.performedAt.toISOString(),
      createdAt: m.createdAt.toISOString(),
    };
  }
}
