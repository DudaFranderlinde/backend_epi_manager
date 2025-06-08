import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class HistoricoEntradaSaida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entrada: number;

  @Column()
  saida: number;

  @Column()
  estoqueFinal: number;

  @Column()
  dataAtualizacao: Date;

  // @ManyToOne(() => EquipamentoEntity, equipamento => equipamento.historico)
  // equipamento: EquipamentoEntity;
}
