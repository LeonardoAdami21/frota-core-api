import { IsISO8601, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'IPVA', enum: ['IPVA', 'SEGURO', 'LICENCIAMENTO', 'DPVAT', 'VISTORIA'] })
  @IsString() type!: string;

  @ApiProperty({ example: '2026-11-30', description: 'Data de vencimento (ISO 8601)' })
  @IsISO8601() dueDate!: string;

  @ApiProperty({ example: 890.0, minimum: 0 })
  @IsNumber() @Min(0) amount!: number;

  @ApiPropertyOptional({ example: 'PENDENTE', enum: ['PENDENTE', 'PAGO'] })
  @IsOptional() @IsString() status?: string;
}
