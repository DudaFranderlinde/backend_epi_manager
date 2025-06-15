import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEquipamentoDto } from "./dto/create-equipamento.dto";
import { EquipamentoEntity } from "./equipamento.entity";
import { Repository } from "typeorm";
import { TipoAtivo } from "src/enums/tipo-ativo.enum";
import { UpdateEquipamentoDto } from "./dto/update-equipamento.dto";

@Injectable()
export class EquipamentoService {
  constructor(
    @Inject('EQUIPAMENTO_REPOSITORY')
    private readonly equipamentoRepo: Repository<EquipamentoEntity>,
  ) {}

  async create(dto: CreateEquipamentoDto): Promise<EquipamentoEntity> {
    const equipamento = this.equipamentoRepo.create(dto);
    return this.equipamentoRepo.save(equipamento);
  }

  async findOneByCod(codigo: number ): Promise<EquipamentoEntity>  {
    const equipamento = this.equipamentoRepo.findOne({
      where: {
        codigo: codigo
      }
    });
    return equipamento;
  }

  async findById(id: number): Promise<EquipamentoEntity> {
    const equipamento = await this.equipamentoRepo.findOne({ where: { id } });
    if (!equipamento) {
      throw new NotFoundException('Equipamento não encontrado');
    }
    return equipamento;
  }

  async findAll(): Promise<EquipamentoEntity[]> {
    return this.equipamentoRepo.find();
  }

  async descontarEstoque(equipamentoId: number, qtd: number): Promise<void> {
    const equipamento = await this.equipamentoRepo.findOne({ where: { id: equipamentoId } });

    if (!equipamento) {
      throw new BadRequestException('Equipamento não encontrado');
    }

    if (equipamento.qtd < qtd) {
      throw new BadRequestException('Estoque insuficiente');
    }

    equipamento.qtd -= qtd;
    await this.equipamentoRepo.save(equipamento);
  }

  async alterarStatusUso(id: number): Promise<{ message: string }> {
      const equipamento = await this.equipamentoRepo.findOne({ where: { id } });
      let alteração;

      if (!equipamento) {
          throw new NotFoundException('Equipamento não encontrado');
      }

      if (equipamento.status_uso == TipoAtivo.ATIVO){
          equipamento.status_uso = TipoAtivo.DESATIVADO
          alteração = "desativado";
      } else {
          equipamento.status_uso = TipoAtivo.ATIVO
          alteração = "reativado"
      }
          
      
      await this.equipamentoRepo.save(equipamento);

      return { message: `Colaborador ${alteração} com sucesso` };
  }

  async updateEquipamento(id: number, data: UpdateEquipamentoDto): Promise<EquipamentoEntity> {
    const equipamento = await this.equipamentoRepo.findOne({ where: { id } });
    if (!equipamento) throw new NotFoundException('equipamento não encontrado');

    if (data.descricao !== undefined) equipamento.descricao = data.descricao;
    if (data.preco !== undefined) equipamento.preco = data.preco;

    return this.equipamentoRepo.save(equipamento);
  }
}
