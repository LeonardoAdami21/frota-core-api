import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRepository } from '../../domain/repositories/refresh-token.repository';
import { UserRepository } from '@modules/users/domain/repositories/user.repository';
import { TokenService } from '../../infra/services/token.service';

interface Input { refreshToken: string; }
export interface Output { accessToken: string; refreshToken: string; }

/**
 * Rotação de refresh token: valida o token recebido, revoga-o e emite
 * um par novo. Um token revogado/expirado é rejeitado.
 */
@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokens: RefreshTokenRepository,
    private readonly users: UserRepository,
    private readonly tokens: TokenService,
  ) {}

  async execute({ refreshToken }: Input): Promise<Output> {
    const stored = await this.refreshTokens.findByToken(refreshToken);
    if (!stored || !stored.isActive()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    const user = await this.users.findById(stored.userId);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    // rotação: revoga o antigo e emite novo par
    stored.revoke();
    await this.refreshTokens.save(stored);

    return this.tokens.issue({ id: user.id, email: user.email.toString(), role: user.role.toString() });
  }
}
