import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qtd: number;

  @Column()
  estoqueMinimo: number;

  @ManyToOne(() => EquipamentoEntity, equipamento => equipamento.estoques)
  equipamento: EquipamentoEntity;
}
