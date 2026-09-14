import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABC1D23', description: 'Placa (padrão antigo ou Mercosul)' })
  @IsString() plate!: string;

  @ApiProperty({ example: 'Fiorino', minLength: 2 })
  @IsString() @MinLength(2) model!: string;

  @ApiProperty({ example: 'Fiat', minLength: 2 })
  @IsString() @MinLength(2) brand!: string;

  @ApiProperty({ example: 2021, minimum: 1950 })
  @IsInt() @Min(1950) year!: number;

  @ApiProperty({ example: 84200, minimum: 0, description: 'Hodômetro em km' })
  @IsInt() @Min(0) odometer!: number;

  @ApiProperty({ example: 'ATIVO', enum: ['ATIVO', 'MANUTENCAO', 'INATIVO'] })
  @IsString() status!: string;

  @ApiPropertyOptional({ example: 'Carlos Nunes' })
  @IsOptional() @IsString() driver?: string;
}
