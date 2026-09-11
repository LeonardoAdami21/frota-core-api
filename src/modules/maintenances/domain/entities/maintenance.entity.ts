import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';

export interface MaintenanceProps {
  vehicleId: string;
  description: string;
  cost: number;
  odometer: number;
  performedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade de domínio Maintenance: um registro de manutenção de um veículo.
 * Pertence a um Vehicle (via vehicleId). Camada: DOMAIN.
 */
export class Maintenance extends Entity<MaintenanceProps> {
  private constructor(props: MaintenanceProps, id?: string) {
    super(props, id);
  }

  static create(
    input: {
      vehicleId: string;
      description: string;
      cost: number;
      odometer: number;
      performedAt: Date;
    },
    id?: string,
  ): Maintenance {
    if (input.description.trim().length < 3) {
      throw new DomainError('Descrição deve ter ao menos 3 caracteres');
    }
    if (input.cost < 0) throw new DomainError('Custo não pode ser negativo');
    if (input.odometer < 0) throw new DomainError('Hodômetro não pode ser negativo');

    const now = new Date();
    return new Maintenance(
      {
        vehicleId: input.vehicleId,
        description: input.description.trim(),
        cost: input.cost,
        odometer: input.odometer,
        performedAt: input.performedAt,
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  static reconstitute(props: MaintenanceProps, id: string): Maintenance {
    return new Maintenance(props, id);
  }

  get vehicleId(): string { return this.props.vehicleId; }
  get description(): string { return this.props.description; }
  get cost(): number { return this.props.cost; }
  get odometer(): number { return this.props.odometer; }
  get performedAt(): Date { return this.props.performedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
