import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @IsString() plate!: string;

  @IsString() @MinLength(2) model!: string;

  @IsString() @MinLength(2) brand!: string;

  @IsInt() @Min(1950) year!: number;

  @IsInt() @Min(0) odometer!: number;

  @IsString() status!: string; // ATIVO | MANUTENCAO | INATIVO

  @IsOptional() @IsString() driver?: string;
}
