import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListUsersUseCase } from '../../../application/use-cases/list-users.use-case';
import { UserPresenter } from '../presenters/user.presenter';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly listUsers: ListUsersUseCase) {}

  /** Rota protegida: exige Bearer token válido. */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.listUsers.execute();
    return users.map(UserPresenter.toHTTP);
  }
}
