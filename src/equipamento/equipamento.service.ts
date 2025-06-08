import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEquipamentoDto } from "./dto/create-equipamento.dto";
import { EquipamentoEntity } from "./equipamento.entity";
import { Repository } from "typeorm";

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
}
