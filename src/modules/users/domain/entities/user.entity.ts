import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';
import { Email } from '../value-objects/email.vo';
import { Role } from '../value-objects/role.vo';

export interface UserProps {
  name: string;
  email: Email;
  password: string; // já em hash quando reconstruída da persistência
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade de domínio User. Concentra as invariantes de negócio.
 * Não conhece Prisma, Nest nem HTTP. Camada: DOMAIN.
 */
export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  /** Cria um usuário novo (senha já deve chegar em hash). Role padrão: OPERADOR. */
  static create(
    input: { name: string; email: Email; password: string; role?: Role },
    id?: string,
  ): User {
    if (input.name.trim().length < 2) {
      throw new DomainError('Nome deve ter ao menos 2 caracteres');
    }
    const now = new Date();
    return new User(
      {
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role ?? Role.operador(),
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  /** Reconstitui a entidade a partir da persistência. */
  static reconstitute(props: UserProps, id: string): User {
    return new User(props, id);
  }

  get name(): string { return this.props.name; }
  get email(): Email { return this.props.email; }
  get password(): string { return this.props.password; }
  get role(): Role { return this.props.role; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
