import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABC1D23', description: 'Placa do veículo' })
  @IsString()
  plate!: string;

  @ApiProperty({ example: 'Onix', minLength: 2 })
  @IsString()
  @MinLength(2)
  model!: string;

  @ApiProperty({ example: 'Chevrolet', minLength: 2 })
  @IsString()
  @MinLength(2)
  brand!: string;

  @ApiProperty({ example: 2022, minimum: 1950 })
  @IsInt()
  @Min(1950)
  year!: number;

  @ApiProperty({ example: 45000, minimum: 0, description: 'Hodômetro em km' })
  @IsInt()
  @Min(0)
  odometer!: number;

  @ApiProperty({
    example: 'ATIVO',
    enum: ['ATIVO', 'MANUTENCAO', 'INATIVO'],
    description: 'Situação do veículo',
  })
  @IsString()
  status!: string;

  @ApiPropertyOptional({ example: 'João da Silva', description: 'Motorista responsável' })
  @IsOptional()
  @IsString()
  driver?: string;
}
