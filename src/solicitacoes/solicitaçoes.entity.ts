import { ColaboradorEntity } from 'src/colaboradores/colaborador.entity';
import { StatusSolicitacao } from 'src/enums/status-solicitacao.enum';
import { Urgencia } from 'src/enums/urgencia.enum';
import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SolicitacaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  qtd: number;

  @Column()
  dataAbertura: Date;

  @Column({ nullable: true })
  dataConclusao: Date;

  @Column({ default: false })
  entrega: boolean;

  @Column({ type: 'enum', enum: StatusSolicitacao })
  status: StatusSolicitacao;

  @Column({ type: 'enum', enum: Urgencia })
  urgencia: Urgencia;

  @ManyToOne(() => EquipamentoEntity, equipamento => equipamento.solicitacoes)
  equipamento: EquipamentoEntity;

  @ManyToOne(() => ColaboradorEntity, colaborador => colaborador.solicitacoes)
  colaborador: ColaboradorEntity;
}
