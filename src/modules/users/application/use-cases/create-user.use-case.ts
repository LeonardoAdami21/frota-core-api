import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Role } from '../../domain/value-objects/role.vo';
import { DomainError } from '@shared/domain/domain.error';
import { Hasher } from '@shared/infra/crypto/hasher';

interface Input {
  name: string;
  email: string;
  password: string;
  role?: string;
}

/**
 * Caso de uso: registrar um usuário. Orquestra domínio + serviços.
 * Camada: APPLICATION.
 */
@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute(input: Input): Promise<User> {
    const email = Email.create(input.email);

    const existing = await this.users.findByEmail(email.toString());
    if (existing) {
      throw new DomainError('Já existe um usuário com este email');
    }

    const hashed = await this.hasher.hash(input.password);
    const user = User.create({
      name: input.name,
      email,
      password: hashed,
      role: input.role ? Role.create(input.role) : undefined,
    });

    await this.users.create(user);
    return user;
  }
}
