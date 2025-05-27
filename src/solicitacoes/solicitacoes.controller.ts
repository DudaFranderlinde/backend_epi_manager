import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { SolicitacaoService } from "./solicitacoes.service";
import { CreateSolicitacaoDto } from "./dto/create-solicitacao.dto";

@UseGuards(JwtAuthGuard)
@Controller('solicitacoes')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @Post('create')
  async create(@Body() dto: CreateSolicitacaoDto,    @Request() req) {
    try {
        const colaboradorId = req.user.sub; 
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


}
