import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { RefreshTokenRepository } from '../../domain/repositories/refresh-token.repository';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Emite o par (access + refresh). O access é um JWT curto; o refresh é
 * um token opaco persistido, que pode ser rotacionado e revogado.
 */
@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly refreshTokens: RefreshTokenRepository,
  ) {}

  async issue(user: { id: string; email: string; role: string }): Promise<TokenPair> {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: this.config.get<string>('JWT_SECRET') ?? 'change-me',
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') ?? '15m',
      },
    );

    const raw = randomBytes(48).toString('hex');
    const days = Number(this.config.get<string>('REFRESH_EXPIRES_DAYS') ?? '7');
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await this.refreshTokens.create(
      RefreshToken.create({ token: raw, userId: user.id, expiresAt }),
    );

    return { accessToken, refreshToken: raw };
  }
}
