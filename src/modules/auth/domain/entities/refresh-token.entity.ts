import { Entity } from '@shared/domain/entity.base';

export interface RefreshTokenProps {
  token: string;
  userId: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

/**
 * Refresh token persistido: permite rotação e revogação.
 * Camada: DOMAIN (do módulo auth).
 */
export class RefreshToken extends Entity<RefreshTokenProps> {
  private constructor(props: RefreshTokenProps, id?: string) {
    super(props, id);
  }

  static create(input: { token: string; userId: string; expiresAt: Date }, id?: string): RefreshToken {
    return new RefreshToken(
      { ...input, revokedAt: null, createdAt: new Date() },
      id,
    );
  }

  static reconstitute(props: RefreshTokenProps, id: string): RefreshToken {
    return new RefreshToken(props, id);
  }

  revoke(): void {
    this.props.revokedAt = new Date();
  }

  /** Válido = não revogado e não expirado. */
  isActive(reference: Date = new Date()): boolean {
    return this.props.revokedAt === null && this.props.expiresAt > reference;
  }

  get token(): string { return this.props.token; }
  get userId(): string { return this.props.userId; }
  get expiresAt(): Date { return this.props.expiresAt; }
  get revokedAt(): Date | null { return this.props.revokedAt; }
}
