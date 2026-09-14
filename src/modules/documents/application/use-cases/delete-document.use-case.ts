import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../domain/repositories/document.repository';

@Injectable()
export class DeleteDocumentUseCase {
  constructor(private readonly documents: DocumentRepository) {}

  async execute(id: string): Promise<void> {
    const found = await this.documents.findById(id);
    if (!found) throw new NotFoundException('Documento não encontrado');
    await this.documents.delete(id);
  }
}
