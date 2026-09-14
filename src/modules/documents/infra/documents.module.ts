import { Module } from '@nestjs/common';
import { DocumentsController } from './http/controllers/documents.controller';
import { CreateDocumentUseCase } from '../application/use-cases/create-document.use-case';
import { ListDocumentsUseCase } from '../application/use-cases/list-documents.use-case';
import { PayDocumentUseCase } from '../application/use-cases/pay-document.use-case';
import { DeleteDocumentUseCase } from '../application/use-cases/delete-document.use-case';
import { DocumentRepository } from '../domain/repositories/document.repository';
import { PrismaDocumentRepository } from './persistence/prisma/prisma-document.repository';
import { DocumentsService } from '../application/services/documents.service';
import { VehiclesModule } from '@modules/vehicles/infra/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [DocumentsController],
  providers: [
    CreateDocumentUseCase,
    ListDocumentsUseCase,
    PayDocumentUseCase,
    DeleteDocumentUseCase,
    DocumentsService,
    { provide: DocumentRepository, useClass: PrismaDocumentRepository },
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}