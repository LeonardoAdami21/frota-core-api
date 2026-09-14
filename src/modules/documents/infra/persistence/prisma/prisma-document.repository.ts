import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { DocumentRepository } from '../../../domain/repositories/document.repository';
import { Document } from '../../../domain/entities/document.entity';
import { DocumentMapper } from './mappers/document.mapper';

@Injectable()
export class PrismaDocumentRepository extends DocumentRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(document: Document): Promise<void> {
    await this.prisma.document.create({ data: DocumentMapper.toPersistence(document) });
  }

  async save(document: Document): Promise<void> {
    await this.prisma.document.update({
      where: { id: document.id },
      data: DocumentMapper.toPersistence(document),
    });
  }

  async findById(id: string): Promise<Document | null> {
    const raw = await this.prisma.document.findUnique({ where: { id } });
    return raw ? DocumentMapper.toDomain(raw) : null;
  }

  async findByVehicle(vehicleId: string): Promise<Document[]> {
    const rows = await this.prisma.document.findMany({
      where: { vehicleId },
      orderBy: { dueDate: 'asc' },
    });
    return rows.map(DocumentMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.delete({ where: { id } });
  }
}
