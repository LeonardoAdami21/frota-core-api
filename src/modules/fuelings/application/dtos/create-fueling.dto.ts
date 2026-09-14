import { IsInt, IsISO8601, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelingDto {
  @ApiProperty({ example: 42.5, minimum: 0.001, description: 'Litros abastecidos' })
  @IsNumber() @Min(0.001) liters!: number;

  @ApiProperty({ example: 252.9, minimum: 0, description: 'Valor total pago' })
  @IsNumber() @Min(0) totalCost!: number;

  @ApiProperty({ example: 84100, minimum: 0 })
  @IsInt() @Min(0) odometer!: number;

  @ApiProperty({ example: '2026-09-08', description: 'Data do abastecimento (ISO 8601)' })
  @IsISO8601() fueledAt!: string;
}
