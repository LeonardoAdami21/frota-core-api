import { randomUUID } from 'node:crypto';

/**
 * Base de toda entidade de domínio. Garante identidade (id) sem acoplar
 * a nenhum framework ou ORM. Camada: DOMAIN.
 */
export abstract class Entity<Props> {
  protected readonly _id: string;
  protected props: Props;

  constructor(props: Props, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  equals(entity?: Entity<Props>): boolean {
    if (!entity) return false;
    return this._id === entity._id;
  }
}
