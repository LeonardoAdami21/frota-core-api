import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/infra/prisma/prisma.module';
import { UsersModule } from '@modules/users/infra/users.module';
import { AuthModule } from '@modules/auth/infra/auth.module';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';
import { MaintenancesModule } from '@modules/maintenances/infra/maintenances.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    VehiclesModule,
    MaintenancesModule,
    AuthModule,
  ],
})
export class AppModule {}
