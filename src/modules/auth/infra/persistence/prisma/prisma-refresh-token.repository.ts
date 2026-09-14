import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { RefreshTokenMapper } from './mappers/refresh-token.mapper';

@Injectable()
export class PrismaRefreshTokenRepository extends RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(token: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.create({ data: RefreshTokenMapper.toPersistence(token) });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const raw = await this.prisma.refreshToken.findUnique({ where: { token } });
    return raw ? RefreshTokenMapper.toDomain(raw) : null;
  }

  async save(token: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: token.id },
      data: RefreshTokenMapper.toPersistence(token),
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
