import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/core/roles/roles.guard";
import { EquipamentoService } from "./equipamento.service";
import { Roles } from "src/core/roles/roles.decorator";
import { TipoPermissao } from "src/enums/tipo-permissao.enum";
import { CreateEquipamentoDto } from "./dto/create-equipamento.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('equipamentos')
export class EquipamentoController {
  constructor(
    private readonly equipamentoService: EquipamentoService
    ) {}

  @Post('create')
  @Roles(TipoPermissao.ADMIN, TipoPermissao.ALMOXARIFADO)
  async create(@Body() dto: CreateEquipamentoDto) {
    return this.equipamentoService.create(dto);
  }
}
