import { Module } from '@nestjs/common';
import { UsersController } from './http/controllers/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { UserRepository } from '../domain/repositories/user.repository';
import { PrismaUserRepository } from './persistence/prisma/prisma-user.repository';
import { Hasher } from '@shared/infra/crypto/hasher';
import { BcryptHasher } from '@shared/infra/crypto/bcrypt.hasher';

/**
 * Wiring do módulo: liga contratos (domínio) às implementações (infra).
 * É aqui que a inversão de dependência acontece na prática.
 */
@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: Hasher, useClass: BcryptHasher },
  ],
  exports: [CreateUserUseCase, UserRepository, Hasher],
})
export class UsersModule {}
