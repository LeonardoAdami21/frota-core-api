import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';

/**
 * Atualização parcial: reaproveita as propriedades (e os @ApiProperty)
 * de CreateVehicleDto, tornando todas opcionais. A placa não é editável.
 */
export class UpdateVehicleDto extends PartialType(
  OmitType(CreateVehicleDto, ['plate'] as const),
) {}
