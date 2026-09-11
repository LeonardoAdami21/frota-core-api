import { DomainError } from '@shared/domain/domain.error';

export type VehicleStatusValue = 'ATIVO' | 'MANUTENCAO' | 'INATIVO';

/** Status operacional do veículo, restrito a um conjunto fechado. */
export class VehicleStatus {
  private static readonly VALIDOS: VehicleStatusValue[] = ['ATIVO', 'MANUTENCAO', 'INATIVO'];
  private readonly value: VehicleStatusValue;

  private constructor(value: VehicleStatusValue) {
    this.value = value;
  }

  static create(raw: string): VehicleStatus {
    const v = raw.toUpperCase() as VehicleStatusValue;
    if (!VehicleStatus.VALIDOS.includes(v)) {
      throw new DomainError(`Status inválido: ${raw}. Use ATIVO, MANUTENCAO ou INATIVO.`);
    }
    return new VehicleStatus(v);
  }

  toString(): VehicleStatusValue {
    return this.value;
  }
}
