import {
  Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infra/guards/roles.guard';
import { Roles } from '@modules/auth/infra/decorators/roles.decorator';
import { CreateFuelingUseCase } from '../../../application/use-cases/create-fueling.use-case';
import { ListFuelingsUseCase } from '../../../application/use-cases/list-fuelings.use-case';
import { DeleteFuelingUseCase } from '../../../application/use-cases/delete-fueling.use-case';
import { CreateFuelingDto } from '../../../application/dtos/create-fueling.dto';
import { FuelingPresenter } from '../presenters/fueling.presenter';

@ApiTags('fuelings')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles/:vehicleId/fuelings')
export class FuelingsController {
  constructor(
    private readonly createFueling: CreateFuelingUseCase,
    private readonly listFuelings: ListFuelingsUseCase,
    private readonly deleteFueling: DeleteFuelingUseCase,
  ) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Registra um abastecimento para o veículo' })
  async create(@Param('vehicleId') vehicleId: string, @Body() dto: CreateFuelingDto) {
    const f = await this.createFueling.execute({ vehicleId, ...dto });
    return FuelingPresenter.toHTTP(f);
  }

  @Get()
  @ApiOperation({ summary: 'Lista os abastecimentos do veículo' })
  async list(@Param('vehicleId') vehicleId: string) {
    const items = await this.listFuelings.execute(vehicleId);
    return items.map(FuelingPresenter.toHTTP);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um abastecimento' })
  async remove(@Param('id') id: string) {
    await this.deleteFueling.execute(id);
  }
}
