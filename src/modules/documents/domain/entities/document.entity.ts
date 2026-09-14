import { Entity } from '@shared/domain/entity.base';
import { DomainError } from '@shared/domain/domain.error';
import { DocumentType } from '../value-objects/document-type.vo';

export type DocumentStatus = 'PENDENTE' | 'PAGO';

export interface DocumentProps {
  vehicleId: string;
  type: DocumentType;
  dueDate: Date;
  amount: number;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Documento do veículo com vencimento (IPVA, seguro, licenciamento...).
 * Concentra a lógica de "quantos dias até vencer" e "está vencido".
 */
export class Document extends Entity<DocumentProps> {
  private constructor(props: DocumentProps, id?: string) {
    super(props, id);
  }

  static create(
    input: {
      vehicleId: string;
      type: DocumentType;
      dueDate: Date;
      amount: number;
      status?: DocumentStatus;
    },
    id?: string,
  ): Document {
    if (input.amount < 0) throw new DomainError('Valor não pode ser negativo');

    const now = new Date();
    return new Document(
      {
        vehicleId: input.vehicleId,
        type: input.type,
        dueDate: input.dueDate,
        amount: input.amount,
        status: input.status ?? 'PENDENTE',
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  static reconstitute(props: DocumentProps, id: string): Document {
    return new Document(props, id);
  }

  /** Marca o documento como pago. */
  markAsPaid(): void {
    this.props.status = 'PAGO';
    this.props.updatedAt = new Date();
  }

  /** Dias até o vencimento (negativo = vencido há N dias). Regra de domínio. */
  daysUntilDue(reference: Date = new Date()): number {
    const umDia = 1000 * 60 * 60 * 24;
    const ref = Date.UTC(reference.getFullYear(), reference.getMonth(), reference.getDate());
    const due = Date.UTC(this.props.dueDate.getFullYear(), this.props.dueDate.getMonth(), this.props.dueDate.getDate());
    return Math.round((due - ref) / umDia);
  }

  /** Está vencido e ainda não pago? */
  isOverdue(reference: Date = new Date()): boolean {
    return this.props.status !== 'PAGO' && this.daysUntilDue(reference) < 0;
  }

  get vehicleId(): string { return this.props.vehicleId; }
  get type(): DocumentType { return this.props.type; }
  get dueDate(): Date { return this.props.dueDate; }
  get amount(): number { return this.props.amount; }
  get status(): DocumentStatus { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
