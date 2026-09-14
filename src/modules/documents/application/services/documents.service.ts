import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Document } from '../../domain/entities/document.entity';

/**
 * API pública do módulo de documentos para OUTROS módulos.
 * Encapsula o DocumentRepository (detalhe interno). Camada: APPLICATION.
 */
@Injectable()
export class DocumentsService {
  constructor(private readonly documents: DocumentRepository) {}

  findByVehicle(vehicleId: string): Promise<Document[]> {
    return this.documents.findByVehicle(vehicleId);
  }
}
