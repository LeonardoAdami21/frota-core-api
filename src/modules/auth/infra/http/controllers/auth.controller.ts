import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { AuthenticateUseCase } from '../../../application/use-cases/authenticate.use-case';
import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user.use-case';
import { CreateUserDto } from '@modules/users/application/dtos/create-user.dto';
import { UserPresenter } from '@modules/users/infra/http/presenters/user.presenter';

class LoginDto {
  @IsEmail() email!: string;
  @IsString() password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticate: AuthenticateUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return UserPresenter.toHTTP(user);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authenticate.execute(dto);
  }
}
