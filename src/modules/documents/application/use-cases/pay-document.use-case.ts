import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Document } from '../../domain/entities/document.entity';

/** Marca um documento como pago, usando o comportamento da entidade. */
@Injectable()
export class PayDocumentUseCase {
  constructor(private readonly documents: DocumentRepository) {}

  async execute(id: string): Promise<Document> {
    const document = await this.documents.findById(id);
    if (!document) throw new NotFoundException('Documento não encontrado');

    document.markAsPaid();
    await this.documents.save(document);
    return document;
  }
}
