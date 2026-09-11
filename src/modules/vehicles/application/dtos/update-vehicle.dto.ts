import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

/** Todos os campos opcionais: atualização parcial. */
export class UpdateVehicleDto {
  @IsOptional() @IsString() @MinLength(2) model?: string;
  @IsOptional() @IsString() @MinLength(2) brand?: string;
  @IsOptional() @IsInt() @Min(1950) year?: number;
  @IsOptional() @IsInt() @Min(0) odometer?: number;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() driver?: string;
}
