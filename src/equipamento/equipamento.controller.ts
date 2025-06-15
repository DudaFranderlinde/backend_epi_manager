import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/core/roles/roles.guard";
import { EquipamentoService } from "./equipamento.service";
import { Roles } from "src/core/roles/roles.decorator";
import { TipoPermissao } from "src/enums/tipo-permissao.enum";
import { CreateEquipamentoDto } from "./dto/create-equipamento.dto";
import { UpdateEquipamentoDto } from "./dto/update-equipamento.dto";

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

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.equipamentoService.findById(id);
  }

  @Get()
  async findAll() {
    return this.equipamentoService.findAll();
  }

  @Patch(':id/status')
    @Roles(TipoPermissao.ADMIN, TipoPermissao.ALMOXARIFADO)
  async alterarStatusUso(
      @Param('id') id: number,
    ) {
      return this.equipamentoService.alterarStatusUso(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEquipamentoDto) {
  return this.equipamentoService.updateEquipamento(id, data);
  }
}
