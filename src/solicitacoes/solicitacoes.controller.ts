import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { SolicitacaoService } from "./solicitacoes.service";
import { CreateSolicitacaoDto } from "./dto/create-solicitacao.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@UseGuards(JwtAuthGuard)
@Controller('solicitacoes')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @Post('create')
  async create(@Body() dto: CreateSolicitacaoDto,  @Request() req) {
    try {
        const colaboradorId = req.user.id;
        return this.solicitacaoService.create(dto, colaboradorId);
    } catch (error) {
        if (error.code == 23505)
            throw new HttpException(
                { message: error.detail, errorCode: HttpStatus.CONFLICT },
                HttpStatus.CONFLICT,
        );

        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('my-request')
  async buscarMinhasSolicitacoes(@Request() req) {
    const colaboradorId = req.user?.id;
    return this.solicitacaoService.findByUserId(Number(colaboradorId));
  }

  @Get('pending')
  async solicitacaoPendente() {
    return this.solicitacaoService.findPending();
  }

  @Get('all')
  async all() {
    return this.solicitacaoService.findAll();
  }

  @Put('aprove')
  async atualizarStatus(
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.solicitacaoService.aprovarStatus(statusDto.id, statusDto.status);
  }

  @Put('delivery')
  async deliveryStatus(
    @Body('id') id: number,
  ) {
    return this.solicitacaoService.entregueStatus(id);
  }


}
