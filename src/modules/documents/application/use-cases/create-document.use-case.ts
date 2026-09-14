import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Document, DocumentStatus } from '../../domain/entities/document.entity';
import { DocumentType } from '../../domain/value-objects/document-type.vo';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

interface Input {
  vehicleId: string;
  type: string;
  dueDate: string;
  amount: number;
  status?: string;
}

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    private readonly documents: DocumentRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(input: Input): Promise<Document> {
    await this.vehicles.ensureExists(input.vehicleId);

    const document = Document.create({
      vehicleId: input.vehicleId,
      type: DocumentType.create(input.type),
      dueDate: new Date(input.dueDate),
      amount: input.amount,
      status: (input.status?.toUpperCase() as DocumentStatus) ?? 'PENDENTE',
    });

    await this.documents.create(document);
    return document;
  }
}
