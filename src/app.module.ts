import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/infra/prisma/prisma.module';
import { UsersModule } from '@modules/users/infra/users.module';
import { AuthModule } from '@modules/auth/infra/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
