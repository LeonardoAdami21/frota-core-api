import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../domain/repositories/refresh-token.repository';

/** Revoga o refresh token informado (logout). */
@Injectable()
export class LogoutUseCase {
  constructor(private readonly refreshTokens: RefreshTokenRepository) {}

  async execute(refreshToken: string): Promise<void> {
    const stored = await this.refreshTokens.findByToken(refreshToken);
    if (stored && stored.revokedAt === null) {
      stored.revoke();
      await this.refreshTokens.save(stored);
    }
  }
}
