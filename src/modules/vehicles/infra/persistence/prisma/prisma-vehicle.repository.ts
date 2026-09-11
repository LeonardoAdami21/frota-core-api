import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { VehicleRepository } from '../../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { VehicleMapper } from './mappers/vehicle.mapper';

@Injectable()
export class PrismaVehicleRepository extends VehicleRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(vehicle: Vehicle): Promise<void> {
    await this.prisma.vehicle.create({ data: VehicleMapper.toPersistence(vehicle) });
  }

  async save(vehicle: Vehicle): Promise<void> {
    const data = VehicleMapper.toPersistence(vehicle);
    await this.prisma.vehicle.update({ where: { id: vehicle.id }, data });
  }

  async findById(id: string): Promise<Vehicle | null> {
    const raw = await this.prisma.vehicle.findUnique({ where: { id } });
    return raw ? VehicleMapper.toDomain(raw) : null;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const raw = await this.prisma.vehicle.findUnique({ where: { plate } });
    return raw ? VehicleMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<Vehicle[]> {
    const rows = await this.prisma.vehicle.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(VehicleMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vehicle.delete({ where: { id } });
  }
}
