import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@modules/users/domain/repositories/user.repository';
import { Hasher } from '@shared/infra/crypto/hasher';
import { TokenService } from '../../infra/services/token.service';

interface Input { email: string; password: string; }
export interface Output {
  accessToken: string;
  refreshToken: string;
  user: { id: string; name: string; email: string; role: string };
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: Hasher,
    private readonly tokens: TokenService,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.users.findByEmail(email.trim().toLowerCase());
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await this.hasher.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const pair = await this.tokens.issue({ id: user.id, email: user.email.toString(), role: user.role.toString() });
    return {
      ...pair,
      user: { id: user.id, name: user.name, email: user.email.toString(), role: user.role.toString() },
    };
  }
}
