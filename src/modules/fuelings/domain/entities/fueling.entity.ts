import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';

export interface FuelingProps {
  vehicleId: string;
  liters: number;
  totalCost: number;
  odometer: number;
  fueledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade Fueling: um abastecimento de um veículo.
 * Deriva o preço por litro como comportamento de domínio.
 */
export class Fueling extends Entity<FuelingProps> {
  private constructor(props: FuelingProps, id?: string) {
    super(props, id);
  }

  static create(
    input: { vehicleId: string; liters: number; totalCost: number; odometer: number; fueledAt: Date },
    id?: string,
  ): Fueling {
    if (input.liters <= 0) throw new DomainError('Litros deve ser maior que zero');
    if (input.totalCost < 0) throw new DomainError('Custo não pode ser negativo');
    if (input.odometer < 0) throw new DomainError('Hodômetro não pode ser negativo');

    const now = new Date();
    return new Fueling({ ...input, createdAt: now, updatedAt: now }, id);
  }

  static reconstitute(props: FuelingProps, id: string): Fueling {
    return new Fueling(props, id);
  }

  /** Preço por litro derivado (regra de domínio). */
  get pricePerLiter(): number {
    return this.props.liters > 0
      ? Number((this.props.totalCost / this.props.liters).toFixed(3))
      : 0;
  }

  get vehicleId(): string { return this.props.vehicleId; }
  get liters(): number { return this.props.liters; }
  get totalCost(): number { return this.props.totalCost; }
  get odometer(): number { return this.props.odometer; }
  get fueledAt(): Date { return this.props.fueledAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
