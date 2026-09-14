import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Document } from '../../domain/entities/document.entity';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';

@Injectable()
export class ListDocumentsUseCase {
  constructor(
    private readonly documents: DocumentRepository,
    private readonly vehicles: VehiclesService,
  ) {}

  async execute(vehicleId: string): Promise<Document[]> {
    await this.vehicles.ensureExists(vehicleId);
    return this.documents.findByVehicle(vehicleId);
  }
}
