import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SolicitacaoEntity } from "./solicitaçoes.entity";
import { Repository } from "typeorm";
import { CreateSolicitacaoDto } from "./dto/create-solicitacao.dto";
import { ColaboradorService } from "../colaboradores/colaborador.service";
import { EquipamentoService } from "../equipamento/equipamento.service";
import { StatusSolicitacao } from "src/enums/status-solicitacao.enum";


@Injectable()
export class SolicitacaoService {
  constructor(
    @Inject('SOLICITACAO_REPOSITORY')
    private readonly solicitacaoRepo: Repository<SolicitacaoEntity>,
    private readonly equipamentoService: EquipamentoService,
    private readonly colaboradorService: ColaboradorService,
  ) {}

  async create(dto: CreateSolicitacaoDto, id_solicitante: number): Promise<SolicitacaoEntity> {
    return new Promise(async(resolve, reject) => {
            try {
                const equipamento = await this.equipamentoService.findOneByCod(dto.equipamentoId);
                if (!equipamento) throw new NotFoundException({message: 'Equipamento não encontrado'});

                console.log(1);
                

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

  async findByUserId(colaboradorId: number): Promise<SolicitacaoEntity[]> {
    return this.solicitacaoRepo.find({
      where: {
        solicitante: {
          id: colaboradorId,
        },
      },
      relations:  ['equipamento', 'solicitante', 'responsavel_epi'],
      order: { dataAbertura: 'DESC' },
    });
  }

  async findPending(): Promise<SolicitacaoEntity[]> {
    return this.solicitacaoRepo.find({
      where: {
        status:  StatusSolicitacao.PENDENTE
      },
      relations:  ['equipamento', 'solicitante', 'responsavel_epi'],
      order: { dataAbertura: 'DESC' },
    });
  }

  async findAll(): Promise<SolicitacaoEntity[]> {
    return this.solicitacaoRepo.find({
      relations:  ['equipamento', 'solicitante', 'responsavel_epi'],
    });
  }

  async aprovarStatus(id: number, status: StatusSolicitacao): Promise<SolicitacaoEntity> {
    const solicitacao = await this.solicitacaoRepo.findOne({
      where: { id },
      relations: ['equipamento'],
    });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    if (solicitacao.status !== StatusSolicitacao.PENDENTE) {
      throw new BadRequestException('Solicitação já foi processada');
    }

    if (status === StatusSolicitacao.APROVADA) {
      await this.equipamentoService.descontarEstoque(solicitacao.equipamento.id, solicitacao.qtd);
    }

    solicitacao.status = status;
    return this.solicitacaoRepo.save(solicitacao);
  }

    async entregueStatus(id: number): Promise<SolicitacaoEntity> {
      const solicitacao = await this.solicitacaoRepo.findOne({
        where: { id, status: StatusSolicitacao.APROVADA },
      });

      if (!solicitacao) {
        throw new NotFoundException('Solicitação não encontrada');
      }

      solicitacao.status = StatusSolicitacao.ENTREGUE;
      return this.solicitacaoRepo.save(solicitacao);
  }

}
