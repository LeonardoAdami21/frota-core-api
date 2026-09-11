import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { CreateVehicleUseCase } from '../../../application/use-cases/create-vehicle.use-case';
import { ListVehiclesUseCase } from '../../../application/use-cases/list-vehicles.use-case';
import { GetVehicleUseCase } from '../../../application/use-cases/get-vehicle.use-case';
import { UpdateVehicleUseCase } from '../../../application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '../../../application/use-cases/delete-vehicle.use-case';
import { CreateVehicleDto } from '../../../application/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../../../application/dtos/update-vehicle.dto';
import { VehiclePresenter } from '../presenters/vehicle.presenter';

/** Todas as rotas de veículos exigem JWT. */
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly createVehicle: CreateVehicleUseCase,
    private readonly listVehicles: ListVehiclesUseCase,
    private readonly getVehicle: GetVehicleUseCase,
    private readonly updateVehicle: UpdateVehicleUseCase,
    private readonly deleteVehicle: DeleteVehicleUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateVehicleDto) {
    const vehicle = await this.createVehicle.execute(dto);
    return VehiclePresenter.toHTTP(vehicle);
  }

  @Get()
  async findAll() {
    const vehicles = await this.listVehicles.execute();
    return vehicles.map(VehiclePresenter.toHTTP);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.getVehicle.execute(id);
    return VehiclePresenter.toHTTP(vehicle);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    const vehicle = await this.updateVehicle.execute({ id, ...dto });
    return VehiclePresenter.toHTTP(vehicle);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.deleteVehicle.execute(id);
  }
}
