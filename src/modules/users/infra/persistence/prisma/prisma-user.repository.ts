import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

/**
 * Implementação concreta do contrato UserRepository usando Prisma.
 * Camada: INFRA. Só aqui o banco existe.
 */
@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({ data: UserMapper.toPersistence(user) });
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<User[]> {
    const rows = await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(UserMapper.toDomain);
  }
}
