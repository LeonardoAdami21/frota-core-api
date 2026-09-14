import { IsInt, IsISO8601, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'Troca de óleo e filtros', minLength: 3 })
  @IsString() @MinLength(3) description!: string;

  @ApiProperty({ example: 320.5, minimum: 0 })
  @IsNumber() @Min(0) cost!: number;

  @ApiProperty({ example: 84200, minimum: 0 })
  @IsInt() @Min(0) odometer!: number;

  @ApiProperty({ example: '2026-09-01', description: 'Data da manutenção (ISO 8601)' })
  @IsISO8601() performedAt!: string;
}
