import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/user.entity';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Role } from '../../../../domain/value-objects/role.vo';

/**
 * Traduz entre o modelo do Prisma (persistência) e a entidade de domínio.
 * Mantém o domínio isolado do schema do banco.
 */
export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.reconstitute(
      {
        name: raw.name,
        email: Email.create(raw.email),
        password: raw.password,
        role: Role.create(raw.role),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      password: user.password,
      role: user.role.toString(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
