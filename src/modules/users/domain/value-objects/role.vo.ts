import { DomainError } from '@shared/domain/domain.error';

export type RoleValue = 'ADMIN' | 'OPERADOR';

/**
 * Papel do usuário no sistema. ADMIN pode tudo; OPERADOR só lê.
 * Value Object imutável, validado na criação.
 */
export class Role {
  private static readonly VALIDOS: RoleValue[] = ['ADMIN', 'OPERADOR'];
  private readonly value: RoleValue;

  private constructor(value: RoleValue) {
    this.value = value;
  }

  static create(raw: string): Role {
    const v = raw.toUpperCase() as RoleValue;
    if (!Role.VALIDOS.includes(v)) {
      throw new DomainError(`Papel inválido: ${raw}. Use ADMIN ou OPERADOR.`);
    }
    return new Role(v);
  }

  static operador(): Role {
    return new Role('OPERADOR');
  }

  isAdmin(): boolean {
    return this.value === 'ADMIN';
  }

  toString(): RoleValue {
    return this.value;
  }
}
