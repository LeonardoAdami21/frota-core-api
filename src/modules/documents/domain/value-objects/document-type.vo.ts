import { DomainError } from '@shared/domain/domain.error';

export type DocumentTypeValue = 'IPVA' | 'SEGURO' | 'LICENCIAMENTO' | 'DPVAT' | 'VISTORIA';

export class DocumentType {
  private static readonly VALIDOS: DocumentTypeValue[] = [
    'IPVA', 'SEGURO', 'LICENCIAMENTO', 'DPVAT', 'VISTORIA',
  ];
  private readonly value: DocumentTypeValue;

  private constructor(value: DocumentTypeValue) {
    this.value = value;
  }

  static create(raw: string): DocumentType {
    const v = raw.toUpperCase() as DocumentTypeValue;
    if (!DocumentType.VALIDOS.includes(v)) {
      throw new DomainError(`Tipo de documento inválido: ${raw}`);
    }
    return new DocumentType(v);
  }

  toString(): DocumentTypeValue {
    return this.value;
  }
}
