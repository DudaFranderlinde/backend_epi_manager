import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistoricoEntradaSaida } from 'src/historicoEntradaSaida/historicoEntradaSaida.entity';
import { SolicitacaoEntity } from 'src/solicitacoes/solicitaçoes.entity';

@Entity()
export class EquipamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, default: () => "nextval('equipamento_entity_codigo_seq')" })
  codigo: number;

  @Column()
  descricao: string;

  @Column({type: 'numeric'})
  preco: number;

  @Column({type: 'int'})
  qtd: number;

  @Column({type: 'varchar'})
  ca: string;

  @Column({type: 'varchar'})
  dataValidade: string;

  // @OneToMany(() => HistoricoEntradaSaida, hist => hist.equipamento)
  // historico: HistoricoEntradaSaida[];

  @OneToMany(() => SolicitacaoEntity, sol => sol.equipamento)
  solicitacoes: SolicitacaoEntity[];
}
