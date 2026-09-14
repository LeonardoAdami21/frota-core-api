import { IsISO8601, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 'PEDAGIO', enum: ['PNEUS', 'PEDAGIO', 'LAVAGEM', 'MULTA', 'ESTACIONAMENTO', 'OUTROS'] })
  @IsString() category!: string;

  @ApiProperty({ example: 'Rota SP-RJ', minLength: 2 })
  @IsString() @MinLength(2) description!: string;

  @ApiProperty({ example: 89.5, minimum: 0 })
  @IsNumber() @Min(0) amount!: number;

  @ApiProperty({ example: '2026-09-05', description: 'Data da despesa (ISO 8601)' })
  @IsISO8601() spentAt!: string;
}
