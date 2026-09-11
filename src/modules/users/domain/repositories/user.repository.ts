import { User } from '../entities/user.entity';

/**
 * Contrato (porta) do repositório de usuários. Definido no DOMAIN;
 * implementado na INFRA. A aplicação depende desta abstração.
 */
export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
