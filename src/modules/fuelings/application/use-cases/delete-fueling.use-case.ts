import { Injectable, NotFoundException } from '@nestjs/common';
import { FuelingRepository } from '../../domain/repositories/fueling.repository';

@Injectable()
export class DeleteFuelingUseCase {
  constructor(private readonly fuelings: FuelingRepository) {}

  async execute(id: string): Promise<void> {
    const found = await this.fuelings.findById(id);
    if (!found) throw new NotFoundException('Abastecimento não encontrado');
    await this.fuelings.delete(id);
  }
}
