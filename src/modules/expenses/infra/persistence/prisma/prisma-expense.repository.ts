import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { ExpenseRepository } from '../../../domain/repositories/expense.repository';
import { Expense } from '../../../domain/entities/expense.entity';
import { ExpenseMapper } from './mappers/expense.mapper';

@Injectable()
export class PrismaExpenseRepository extends ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(expense: Expense): Promise<void> {
    await this.prisma.expense.create({ data: ExpenseMapper.toPersistence(expense) });
  }

  async findById(id: string): Promise<Expense | null> {
    const raw = await this.prisma.expense.findUnique({ where: { id } });
    return raw ? ExpenseMapper.toDomain(raw) : null;
  }

  async findByVehicle(vehicleId: string): Promise<Expense[]> {
    const rows = await this.prisma.expense.findMany({
      where: { vehicleId },
      orderBy: { spentAt: 'desc' },
    });
    return rows.map(ExpenseMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.expense.delete({ where: { id } });
  }
}
