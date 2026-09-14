import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticateUseCase } from '../../../application/use-cases/authenticate.use-case';
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../../../application/use-cases/logout.use-case';
import { LoginDto } from '../../../application/dtos/login.dto';
import { RefreshTokenDto } from '../../../application/dtos/refresh-token.dto';
import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user.use-case';
import { CreateUserDto } from '@modules/users/application/dtos/create-user.dto';
import { UserPresenter } from '@modules/users/infra/http/presenters/user.presenter';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticate: AuthenticateUseCase,
    private readonly refreshToken: RefreshTokenUseCase,
    private readonly logout: LogoutUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return UserPresenter.toHTTP(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica e retorna access + refresh token' })
  login(@Body() dto: LoginDto) {
    return this.authenticate.execute(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rotaciona o refresh token e emite um novo par' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.refreshToken.execute(dto);
  }

  @Post('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Revoga o refresh token (logout)' })
  async doLogout(@Body() dto: RefreshTokenDto) {
    await this.logout.execute(dto.refreshToken);
  }
}
