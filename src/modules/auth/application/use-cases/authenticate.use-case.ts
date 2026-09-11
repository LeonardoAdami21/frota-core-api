import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@modules/users/domain/repositories/user.repository';
import { Hasher } from '@shared/infra/crypto/hasher';

interface Input { email: string; password: string; }
export interface Output { accessToken: string; user: { id: string; name: string; email: string }; }

/**
 * Caso de uso de autenticação: valida credenciais e emite JWT.
 * Camada: APPLICATION.
 */
@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: Hasher,
    private readonly jwt: JwtService,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.users.findByEmail(email.trim().toLowerCase());
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await this.hasher.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email.toString() });
    return {
      accessToken,
      user: { id: user.id, name: user.name, email: user.email.toString() },
    };
  }
}
