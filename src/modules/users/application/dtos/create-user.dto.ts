import { IsEmail, IsString, MinLength } from 'class-validator';

/** DTO de entrada validado na borda HTTP. */
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
