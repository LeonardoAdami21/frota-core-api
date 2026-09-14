import { Module } from '@nestjs/common';
import { FuelingsController } from './http/controllers/fuelings.controller';
import { CreateFuelingUseCase } from '../application/use-cases/create-fueling.use-case';
import { ListFuelingsUseCase } from '../application/use-cases/list-fuelings.use-case';
import { DeleteFuelingUseCase } from '../application/use-cases/delete-fueling.use-case';
import { FuelingRepository } from '../domain/repositories/fueling.repository';
import { PrismaFuelingRepository } from './persistence/prisma/prisma-fueling.repository';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [FuelingsController],
  providers: [
    CreateFuelingUseCase,
    ListFuelingsUseCase,
    DeleteFuelingUseCase,
    { provide: FuelingRepository, useClass: PrismaFuelingRepository },
  ],
})
export class FuelingsModule {}
