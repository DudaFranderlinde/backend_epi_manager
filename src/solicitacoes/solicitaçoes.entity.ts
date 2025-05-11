import { ColaboradorEntity } from 'src/colaboradores/colaborador.entity';
import { StatusSolicitacao } from 'src/enums/status-solicitacao.enum';
import { Urgencia } from 'src/enums/urgencia.enum';
import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SolicitacaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, default: () => "nextval('solicitacao_entity_codigo_seq')", nullable: true })
  codigo: string;

  @Column({type: 'int'})
  qtd: number;

  @Column()
  dataAbertura: Date;

  @Column({ nullable: true })
  dataConclusao: Date;

  @Column({ default: false, nullable: true })
  entrega: boolean;

  @Column({ type: 'enum', enum: StatusSolicitacao, nullable: true })
  status: StatusSolicitacao;

  @Column({ type: 'enum', enum: Urgencia })
  urgencia: Urgencia;

  @ManyToOne(() => EquipamentoEntity, equipamento => equipamento.solicitacoes)
  equipamento: EquipamentoEntity;

  @ManyToOne(() => ColaboradorEntity, colaborador => colaborador.solicitacoes)
  solicitante: ColaboradorEntity;

  @ManyToOne(() => ColaboradorEntity, colaborador => colaborador.solicitacoes)
  responsavel_epi: ColaboradorEntity;
}
