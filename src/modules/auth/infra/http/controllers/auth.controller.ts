import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { AuthenticateUseCase } from '../../../application/use-cases/authenticate.use-case';
import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user.use-case';
import { CreateUserDto } from '@modules/users/application/dtos/create-user.dto';
import { UserPresenter } from '@modules/users/infra/http/presenters/user.presenter';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

class LoginDto {
  @IsEmail() email!: string;
  @IsString() password!: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authenticate: AuthenticateUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Registrar um usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado', type: UserPresenter })
  @ApiBadRequestResponse({ description: 'Usuario já cadastrado' })
  @ApiConflictResponse({ description: 'Email ou senha inválidos' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return UserPresenter.toHTTP(user);
  }

  @ApiOperation({ summary: 'Autenticar um usuário' })
  @ApiCreatedResponse({
    description: 'Usuário autenticado',
    type: UserPresenter,
  })
  @ApiBadRequestResponse({ description: 'Email ou senha inválidos' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authenticate.execute(dto);
  }
}
