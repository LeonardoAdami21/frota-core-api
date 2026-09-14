import { Document } from '../entities/document.entity';

export abstract class DocumentRepository {
  abstract create(document: Document): Promise<void>;
  abstract save(document: Document): Promise<void>;
  abstract findById(id: string): Promise<Document | null>;
  abstract findByVehicle(vehicleId: string): Promise<Document[]>;
  abstract delete(id: string): Promise<void>;
}
