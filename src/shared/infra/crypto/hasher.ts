/**
 * Contrato de hashing. Definido para que a aplicação dependa da abstração,
 * não da lib concreta (bcrypt). Implementação fica na infra.
 */
export abstract class Hasher {
  abstract hash(plain: string): Promise<string>;
  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
