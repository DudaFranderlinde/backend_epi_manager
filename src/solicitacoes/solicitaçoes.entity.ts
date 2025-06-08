import { ColaboradorEntity } from '../colaboradores/colaborador.entity';
import { StatusSolicitacao } from '../enums/status-solicitacao.enum';
import { Urgencia } from '../enums/urgencia.enum';
import { EquipamentoEntity } from '../equipamento/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SolicitacaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  qtd: number;

  @Column()
  dataAbertura: Date;

  @Column({ nullable: true })
  dataConclusao: Date;

  @Column({ default: false, nullable: true })
  entrega: boolean;

  @Column({ type: 'enum', enum: StatusSolicitacao, nullable: true, default: StatusSolicitacao.PENDENTE })
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
