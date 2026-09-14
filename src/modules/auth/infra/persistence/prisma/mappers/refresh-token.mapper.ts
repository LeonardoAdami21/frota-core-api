import { RefreshToken as PrismaRefreshToken } from '@prisma/client';
import { RefreshToken } from '../../../../domain/entities/refresh-token.entity';

export class RefreshTokenMapper {
  static toDomain(raw: PrismaRefreshToken): RefreshToken {
    return RefreshToken.reconstitute(
      {
        token: raw.token,
        userId: raw.userId,
        expiresAt: raw.expiresAt,
        revokedAt: raw.revokedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  static toPersistence(rt: RefreshToken) {
    return {
      id: rt.id,
      token: rt.token,
      userId: rt.userId,
      expiresAt: rt.expiresAt,
      revokedAt: rt.revokedAt,
    };
  }
}
