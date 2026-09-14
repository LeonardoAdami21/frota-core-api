import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'a1b2c3...', description: 'Refresh token opaco recebido no login' })
  @IsString() refreshToken!: string;
}
