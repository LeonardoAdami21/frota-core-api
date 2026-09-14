import {
  Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infra/guards/roles.guard';
import { Roles } from '@modules/auth/infra/decorators/roles.decorator';
import { CreateExpenseUseCase } from '../../../application/use-cases/create-expense.use-case';
import { ListExpensesUseCase } from '../../../application/use-cases/list-expenses.use-case';
import { DeleteExpenseUseCase } from '../../../application/use-cases/delete-expense.use-case';
import { CreateExpenseDto } from '../../../application/dtos/create-expense.dto';
import { ExpensePresenter } from '../presenters/expense.presenter';

@ApiTags('expenses')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles/:vehicleId/expenses')
export class ExpensesController {
  constructor(
    private readonly createExpense: CreateExpenseUseCase,
    private readonly listExpenses: ListExpensesUseCase,
    private readonly deleteExpense: DeleteExpenseUseCase,
  ) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Registra uma despesa para o veículo' })
  async create(@Param('vehicleId') vehicleId: string, @Body() dto: CreateExpenseDto) {
    const e = await this.createExpense.execute({ vehicleId, ...dto });
    return ExpensePresenter.toHTTP(e);
  }

  @Get()
  @ApiOperation({ summary: 'Lista as despesas do veículo' })
  async list(@Param('vehicleId') vehicleId: string) {
    const items = await this.listExpenses.execute(vehicleId);
    return items.map(ExpensePresenter.toHTTP);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove uma despesa' })
  async remove(@Param('id') id: string) {
    await this.deleteExpense.execute(id);
  }
}
