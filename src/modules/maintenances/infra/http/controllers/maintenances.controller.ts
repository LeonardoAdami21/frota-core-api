import {
  Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infra/guards/roles.guard';
import { Roles } from '@modules/auth/infra/decorators/roles.decorator';
import { CreateMaintenanceUseCase } from '../../../application/use-cases/create-maintenance.use-case';
import { ListMaintenancesUseCase } from '../../../application/use-cases/list-maintenances.use-case';
import { DeleteMaintenanceUseCase } from '../../../application/use-cases/delete-maintenance.use-case';
import { CreateMaintenanceDto } from '../../../application/dtos/create-maintenance.dto';
import { MaintenancePresenter } from '../presenters/maintenance.presenter';

/** Manutenções são aninhadas sob um veículo. */
@ApiTags('maintenances')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles/:vehicleId/maintenances')
export class MaintenancesController {
  constructor(
    private readonly createMaintenance: CreateMaintenanceUseCase,
    private readonly listMaintenances: ListMaintenancesUseCase,
    private readonly deleteMaintenance: DeleteMaintenanceUseCase,
  ) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Registra uma manutenção para o veículo' })
  async create(@Param('vehicleId') vehicleId: string, @Body() dto: CreateMaintenanceDto) {
    const m = await this.createMaintenance.execute({ vehicleId, ...dto });
    return MaintenancePresenter.toHTTP(m);
  }

  @Get()
  @ApiOperation({ summary: 'Lista as manutenções do veículo' })
  async list(@Param('vehicleId') vehicleId: string) {
    const items = await this.listMaintenances.execute(vehicleId);
    return items.map(MaintenancePresenter.toHTTP);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove uma manutenção' })
  async remove(@Param('id') id: string) {
    await this.deleteMaintenance.execute(id);
  }
}
