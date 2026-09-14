import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { FuelingRepository } from '../../../domain/repositories/fueling.repository';
import { Fueling } from '../../../domain/entities/fueling.entity';
import { FuelingMapper } from './mappers/fueling.mapper';

@Injectable()
export class PrismaFuelingRepository extends FuelingRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(fueling: Fueling): Promise<void> {
    await this.prisma.fueling.create({ data: FuelingMapper.toPersistence(fueling) });
  }

  async findById(id: string): Promise<Fueling | null> {
    const raw = await this.prisma.fueling.findUnique({ where: { id } });
    return raw ? FuelingMapper.toDomain(raw) : null;
  }

  async findByVehicle(vehicleId: string): Promise<Fueling[]> {
    const rows = await this.prisma.fueling.findMany({
      where: { vehicleId },
      orderBy: { fueledAt: 'desc' },
    });
    return rows.map(FuelingMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.fueling.delete({ where: { id } });
  }
}
