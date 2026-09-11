import { Module } from '@nestjs/common';
import { VehiclesController } from './http/controllers/vehicles.controller';
import { CreateVehicleUseCase } from '../application/use-cases/create-vehicle.use-case';
import { ListVehiclesUseCase } from '../application/use-cases/list-vehicles.use-case';
import { GetVehicleUseCase } from '../application/use-cases/get-vehicle.use-case';
import { UpdateVehicleUseCase } from '../application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '../application/use-cases/delete-vehicle.use-case';
import { VehicleRepository } from '../domain/repositories/vehicle.repository';
import { PrismaVehicleRepository } from './persistence/prisma/prisma-vehicle.repository';

@Module({
  controllers: [VehiclesController],
  providers: [
    CreateVehicleUseCase,
    ListVehiclesUseCase,
    GetVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
    { provide: VehicleRepository, useClass: PrismaVehicleRepository },
  ],
})
export class VehiclesModule {}
