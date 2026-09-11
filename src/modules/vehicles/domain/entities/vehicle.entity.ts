import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';
import { Plate } from '../value-objects/plate.vo';
import { VehicleStatus } from '../value-objects/vehicle-status.vo';

export interface VehicleProps {
  plate: Plate;
  model: string;
  brand: string;
  year: number;
  odometer: number;
  status: VehicleStatus;
  driver: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade de domínio Vehicle. Concentra as invariantes do negócio de frota.
 * Não conhece Prisma, Nest nem HTTP. Camada: DOMAIN.
 */
export class Vehicle extends Entity<VehicleProps> {
  private constructor(props: VehicleProps, id?: string) {
    super(props, id);
  }

  static create(
    input: {
      plate: Plate;
      model: string;
      brand: string;
      year: number;
      odometer: number;
      status: VehicleStatus;
      driver?: string | null;
    },
    id?: string,
  ): Vehicle {
    Vehicle.assertModel(input.model);
    Vehicle.assertYear(input.year);
    Vehicle.assertOdometer(input.odometer);

    const now = new Date();
    return new Vehicle(
      {
        plate: input.plate,
        model: input.model.trim(),
        brand: input.brand.trim(),
        year: input.year,
        odometer: input.odometer,
        status: input.status,
        driver: input.driver?.trim() || null,
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  static reconstitute(props: VehicleProps, id: string): Vehicle {
    return new Vehicle(props, id);
  }

  /** Atualiza campos permitidos, reprocessando invariantes. */
  update(patch: {
    model?: string;
    brand?: string;
    year?: number;
    odometer?: number;
    status?: VehicleStatus;
    driver?: string | null;
  }): void {
    if (patch.model !== undefined) {
      Vehicle.assertModel(patch.model);
      this.props.model = patch.model.trim();
    }
    if (patch.brand !== undefined) this.props.brand = patch.brand.trim();
    if (patch.year !== undefined) {
      Vehicle.assertYear(patch.year);
      this.props.year = patch.year;
    }
    if (patch.odometer !== undefined) {
      // odômetro nunca anda para trás
      if (patch.odometer < this.props.odometer) {
        throw new DomainError('O hodômetro não pode ser menor que o valor atual');
      }
      this.props.odometer = patch.odometer;
    }
    if (patch.status !== undefined) this.props.status = patch.status;
    if (patch.driver !== undefined) this.props.driver = patch.driver?.trim() || null;
    this.props.updatedAt = new Date();
  }

  private static assertModel(model: string): void {
    if (model.trim().length < 2) throw new DomainError('Modelo deve ter ao menos 2 caracteres');
  }
  private static assertYear(year: number): void {
    const limite = new Date().getFullYear() + 1;
    if (year < 1950 || year > limite) throw new DomainError(`Ano deve estar entre 1950 e ${limite}`);
  }
  private static assertOdometer(odometer: number): void {
    if (odometer < 0) throw new DomainError('Hodômetro não pode ser negativo');
  }

  get plate(): Plate { return this.props.plate; }
  get model(): string { return this.props.model; }
  get brand(): string { return this.props.brand; }
  get year(): number { return this.props.year; }
  get odometer(): number { return this.props.odometer; }
  get status(): VehicleStatus { return this.props.status; }
  get driver(): string | null { return this.props.driver; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
