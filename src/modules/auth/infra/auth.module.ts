import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './http/controllers/auth.controller';
import { AuthenticateUseCase } from '../application/use-cases/authenticate.use-case';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { TokenService } from './services/token.service';
import { RefreshTokenRepository } from '../domain/repositories/refresh-token.repository';
import { PrismaRefreshTokenRepository } from './persistence/prisma/prisma-refresh-token.repository';
import { UsersModule } from '@modules/users/infra/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'change-me',
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') ?? '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthenticateUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    JwtStrategy,
    RolesGuard,
    TokenService,
    { provide: RefreshTokenRepository, useClass: PrismaRefreshTokenRepository },
  ],
  exports: [RolesGuard],
})
export class AuthModule {}
