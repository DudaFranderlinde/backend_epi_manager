import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SolicitacaoEntity } from "./solicitaçoes.entity";
import { Repository } from "typeorm";
import { CreateSolicitacaoDto } from "./dto/create-solicitacao.dto";
import { ColaboradorService } from "../colaboradores/colaborador.service";
import { EquipamentoService } from "../equipamento/equipamento.service";


@Injectable()
export class SolicitacaoService {
  constructor(
    @Inject('SOLICITACAO_REPOSITORY')
    private readonly solicitacaoRepo: Repository<SolicitacaoEntity>,
    private readonly equipamentoService: EquipamentoService,
    private readonly colaboradorService: ColaboradorService

  ) {}

  async create(dto: CreateSolicitacaoDto, id_solicitante: number): Promise<SolicitacaoEntity> {
    return new Promise(async(resolve, reject) => {
            try {
                const equipamento = await this.equipamentoService.findOneByCod(dto.equipamentoId);
                if (!equipamento) throw new NotFoundException('Equipamento não encontrado');

                const solicitante = await this.colaboradorService.findColaboradorById(id_solicitante);
                if (!solicitante) throw new NotFoundException('Erro na Integrção! Colaborador não encontrado');

                const responsavel = await this.colaboradorService.findByMatricula(dto.matricula_responsavel);
                if (!responsavel) throw new NotFoundException('Erro na Integrção! Colaborador não encontrado');

                const novaSolicitacao = this.solicitacaoRepo.create();
                novaSolicitacao.dataAbertura = new Date();
                novaSolicitacao.equipamento = equipamento;
                novaSolicitacao.urgencia = dto.urgencia;
                novaSolicitacao.qtd = dto.qtd;
                novaSolicitacao.solicitante = solicitante;
                novaSolicitacao.responsavel_epi = responsavel;

                const solicitacaoCriada = await this.solicitacaoRepo.save(novaSolicitacao);

                resolve(solicitacaoCriada)

            } catch (error) {
                return reject({
                    code: error.code,
                    detail: error.detail,
                });
            }
    })

  }
}
