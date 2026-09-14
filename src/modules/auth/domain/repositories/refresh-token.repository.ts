import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class RefreshTokenRepository {
  abstract create(token: RefreshToken): Promise<void>;
  abstract findByToken(token: string): Promise<RefreshToken | null>;
  abstract save(token: RefreshToken): Promise<void>;
  abstract revokeAllForUser(userId: string): Promise<void>;
}
