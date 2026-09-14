import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListUsersUseCase } from '../../../application/use-cases/list-users.use-case';
import { UserPresenter } from '../presenters/user.presenter';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly listUsers: ListUsersUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários (requer token)' })
  async findAll() {
    const users = await this.listUsers.execute();
    return users.map(UserPresenter.toHTTP);
  }
}
