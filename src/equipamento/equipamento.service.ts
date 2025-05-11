import { Inject, Injectable } from "@nestjs/common";
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
}
