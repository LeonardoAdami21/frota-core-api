import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'maria@empresa.com', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'senhaForte123', format: 'password' })
  @IsString()
  password!: string;
}
