import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infra/guards/roles.guard';
import { Roles } from '@modules/auth/infra/decorators/roles.decorator';
import { CreateDocumentUseCase } from '../../../application/use-cases/create-document.use-case';
import { ListDocumentsUseCase } from '../../../application/use-cases/list-documents.use-case';
import { PayDocumentUseCase } from '../../../application/use-cases/pay-document.use-case';
import { DeleteDocumentUseCase } from '../../../application/use-cases/delete-document.use-case';
import { CreateDocumentDto } from '../../../application/dtos/create-document.dto';
import { DocumentPresenter } from '../presenters/document.presenter';

@ApiTags('documents')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles/:vehicleId/documents')
export class DocumentsController {
  constructor(
    private readonly createDocument: CreateDocumentUseCase,
    private readonly listDocuments: ListDocumentsUseCase,
    private readonly payDocument: PayDocumentUseCase,
    private readonly deleteDocument: DeleteDocumentUseCase,
  ) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Cadastra um documento (com vencimento) para o veículo' })
  async create(@Param('vehicleId') vehicleId: string, @Body() dto: CreateDocumentDto) {
    const d = await this.createDocument.execute({ vehicleId, ...dto });
    return DocumentPresenter.toHTTP(d);
  }

  @Get()
  @ApiOperation({ summary: 'Lista os documentos do veículo (com dias até vencer)' })
  async list(@Param('vehicleId') vehicleId: string) {
    const items = await this.listDocuments.execute(vehicleId);
    return items.map(DocumentPresenter.toHTTP);
  }

  @Roles('ADMIN')
  @Patch(':id/pay')
  @ApiOperation({ summary: 'Marca um documento como pago' })
  async pay(@Param('id') id: string) {
    const d = await this.payDocument.execute(id);
    return DocumentPresenter.toHTTP(d);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um documento' })
  async remove(@Param('id') id: string) {
    await this.deleteDocument.execute(id);
  }
}
