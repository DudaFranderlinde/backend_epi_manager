import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Estoque } from 'src/estoque/estoque.entity';
import { HistoricoEntradaSaida } from 'src/historicoEntradaSaida/historicoEntradaSaida.entity';
import { SolicitacaoEntity } from 'src/solicitacoes/solicitaçoes.entity';

@Entity()
export class EquipamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, default: () => "nextval('equipamento_entity_codigo_seq')" })
  codigo: string;

  @Column()
  descricao: string;

  @Column({type: 'numeric'})
  preco: number;

  @Column({ nullable: true })
  dataValidade: Date;

  @Column({ nullable: true })
  ca: string;

  @OneToMany(() => Estoque, estoque => estoque.equipamento)
  estoques: Estoque[];

  @OneToMany(() => HistoricoEntradaSaida, hist => hist.equipamento)
  historico: HistoricoEntradaSaida[];

  @OneToMany(() => SolicitacaoEntity, sol => sol.equipamento)
  solicitacoes: SolicitacaoEntity[];
}
