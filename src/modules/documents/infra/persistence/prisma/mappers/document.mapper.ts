import { Document as PrismaDocument } from '@prisma/client';
import { Document, DocumentStatus } from '../../../../domain/entities/document.entity';
import { DocumentType } from '../../../../domain/value-objects/document-type.vo';

export class DocumentMapper {
  static toDomain(raw: PrismaDocument): Document {
    return Document.reconstitute(
      {
        vehicleId: raw.vehicleId,
        type: DocumentType.create(raw.type),
        dueDate: raw.dueDate,
        amount: Number(raw.amount),
        status: raw.status as DocumentStatus,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(d: Document) {
    return {
      id: d.id,
      vehicleId: d.vehicleId,
      type: d.type.toString(),
      dueDate: d.dueDate,
      amount: d.amount,
      status: d.status,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    };
  }
}
