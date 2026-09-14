import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { GetDashboardUseCase } from '../../../application/get-dashboard.use-case';

@ApiTags('dashboard')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboard: GetDashboardUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Resumo consolidado da frota (custos, alertas, ranking)' })
  async index() {
    return this.getDashboard.execute();
  }
}
