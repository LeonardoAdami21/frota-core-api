import { Injectable } from '@nestjs/common';
import { VehiclesService } from '@modules/vehicles/application/services/vehicles.service';
import { MaintenancesService } from '@modules/maintenances/application/services/maintenances.service';
import { FuelingsService } from '@modules/fuelings/application/services/fuelings.service';
import { ExpensesService } from '@modules/expenses/application/services/expenses.service';
import { DocumentsService } from '@modules/documents/application/services/documents.service';

export interface DashboardData {
  fleet: { total: number; active: number; maintenance: number; inactive: number };
  costs: { maintenance: number; fueling: number; expense: number; total: number };
  costByVehicle: { vehicleId: string; label: string; plate: string; total: number }[];
  alerts: {
    vehicleId: string; plate: string; type: string; dueDate: string;
    daysUntilDue: number; overdue: boolean;
  }[];
}

/**
 * Caso de uso de leitura que cruza vários domínios para montar o painel.
 * Depende dos serviços públicos de cada módulo, não dos repositórios internos.
 */
@Injectable()
export class GetDashboardUseCase {
  constructor(
    private readonly vehicles: VehiclesService,
    private readonly maintenances: MaintenancesService,
    private readonly fuelings: FuelingsService,
    private readonly expenses: ExpensesService,
    private readonly documents: DocumentsService,
  ) {}

  async execute(): Promise<DashboardData> {
    const allVehicles = await this.vehicles.findAll();

    const fleet = {
      total: allVehicles.length,
      active: allVehicles.filter((v) => v.status.toString() === 'ATIVO').length,
      maintenance: allVehicles.filter((v) => v.status.toString() === 'MANUTENCAO').length,
      inactive: allVehicles.filter((v) => v.status.toString() === 'INATIVO').length,
    };

    const costs = { maintenance: 0, fueling: 0, expense: 0, total: 0 };
    const costByVehicle: DashboardData['costByVehicle'] = [];
    const alerts: DashboardData['alerts'] = [];

    for (const v of allVehicles) {
      const [ms, fs, es, ds] = await Promise.all([
        this.maintenances.findByVehicle(v.id),
        this.fuelings.findByVehicle(v.id),
        this.expenses.findByVehicle(v.id),
        this.documents.findByVehicle(v.id),
      ]);

      const cm = ms.reduce((s, m) => s + m.cost, 0);
      const cf = fs.reduce((s, f) => s + f.totalCost, 0);
      const ce = es.reduce((s, e) => s + e.amount, 0);

      costs.maintenance += cm;
      costs.fueling += cf;
      costs.expense += ce;

      const totalVeiculo = cm + cf + ce;
      if (totalVeiculo > 0) {
        costByVehicle.push({
          vehicleId: v.id,
          label: `${v.brand} ${v.model}`,
          plate: v.plate.toString(),
          total: Number(totalVeiculo.toFixed(2)),
        });
      }

      // documentos vencidos ou a vencer em <= 30 dias e não pagos
      for (const d of ds) {
        const dias = d.daysUntilDue();
        if (d.status !== 'PAGO' && dias <= 30) {
          alerts.push({
            vehicleId: v.id,
            plate: v.plate.toString(),
            type: d.type.toString(),
            dueDate: d.dueDate.toISOString(),
            daysUntilDue: dias,
            overdue: d.isOverdue(),
          });
        }
      }
    }

    costs.total = Number((costs.maintenance + costs.fueling + costs.expense).toFixed(2));
    costByVehicle.sort((a, b) => b.total - a.total);
    alerts.sort((a, b) => a.daysUntilDue - b.daysUntilDue);

    return { fleet, costs, costByVehicle, alerts };
  }
}
