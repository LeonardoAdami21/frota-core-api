import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Autoriza a rota se o papel do usuário (posto no JWT e exposto em
 * request.user.role) estiver entre os papéis exigidos pelo @Roles().
 * Deve rodar depois do JwtAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Sem @Roles() na rota => qualquer usuário autenticado passa.
    if (!required || required.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (user && required.includes(user.role)) return true;

    throw new ForbiddenException('Você não tem permissão para esta ação');
  }
}
