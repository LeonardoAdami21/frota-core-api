import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/** Todos os campos opcionais: atualização parcial. */
export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 'Fiorino Endurance' })
  @IsOptional() @IsString() @MinLength(2) model?: string;

  @ApiPropertyOptional({ example: 'Fiat' })
  @IsOptional() @IsString() @MinLength(2) brand?: string;

  @ApiPropertyOptional({ example: 2022 })
  @IsOptional() @IsInt() @Min(1950) year?: number;

  @ApiPropertyOptional({ example: 90000 })
  @IsOptional() @IsInt() @Min(0) odometer?: number;

  @ApiPropertyOptional({ example: 'MANUTENCAO', enum: ['ATIVO', 'MANUTENCAO', 'INATIVO'] })
  @IsOptional() @IsString() status?: string;

  @ApiPropertyOptional({ example: 'Ana Souza' })
  @IsOptional() @IsString() driver?: string;
}
