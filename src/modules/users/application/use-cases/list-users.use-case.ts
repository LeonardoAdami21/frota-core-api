import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly users: UserRepository) {}

  execute(): Promise<User[]> {
    return this.users.findAll();
  }
}
