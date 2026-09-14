import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** DTO de entrada validado na borda HTTP. */
export class CreateUserDto {
  @ApiProperty({ example: 'Maria Silva', minLength: 2 })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'maria@empresa.com', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'senhaForte123', minLength: 6, format: 'password' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({ example: 'OPERADOR', enum: ['ADMIN', 'OPERADOR'], description: 'Padrão: OPERADOR' })
  @IsOptional()
  @IsIn(['ADMIN', 'OPERADOR', 'admin', 'operador'])
  role?: string;
}
