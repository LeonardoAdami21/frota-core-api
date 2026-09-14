import { Document } from '../../../domain/entities/document.entity';

export class DocumentPresenter {
  static toHTTP(d: Document) {
    return {
      id: d.id,
      vehicleId: d.vehicleId,
      type: d.type.toString(),
      dueDate: d.dueDate.toISOString(),
      amount: d.amount,
      status: d.status,
      daysUntilDue: d.daysUntilDue(),
      overdue: d.isOverdue(),
      createdAt: d.createdAt.toISOString(),
    };
  }
}
