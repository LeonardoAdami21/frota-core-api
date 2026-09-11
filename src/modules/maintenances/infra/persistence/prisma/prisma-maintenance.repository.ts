import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { MaintenanceRepository } from '../../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceMapper } from './mappers/maintenance.mapper';

@Injectable()
export class PrismaMaintenanceRepository extends MaintenanceRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(maintenance: Maintenance): Promise<void> {
    await this.prisma.maintenance.create({ data: MaintenanceMapper.toPersistence(maintenance) });
  }

  async findById(id: string): Promise<Maintenance | null> {
    const raw = await this.prisma.maintenance.findUnique({ where: { id } });
    return raw ? MaintenanceMapper.toDomain(raw) : null;
  }

  async findByVehicle(vehicleId: string): Promise<Maintenance[]> {
    const rows = await this.prisma.maintenance.findMany({
      where: { vehicleId },
      orderBy: { performedAt: 'desc' },
    });
    return rows.map(MaintenanceMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.maintenance.delete({ where: { id } });
  }
}
