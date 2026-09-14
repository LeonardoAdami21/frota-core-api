import { User } from '../../../domain/entities/user.entity';

/** Formata a entidade para resposta HTTP, sem vazar a senha. */
export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      role: user.role.toString(),
      createdAt: user.createdAt.toISOString(),
    };
  }
}
