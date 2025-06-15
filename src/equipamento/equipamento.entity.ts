import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SolicitacaoEntity } from 'src/solicitacoes/solicitaçoes.entity';
import { TipoAtivo } from 'src/enums/tipo-ativo.enum';

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
  data_validade: string;

  @OneToMany(() => SolicitacaoEntity, sol => sol.equipamento)
  solicitacoes: SolicitacaoEntity[];

  @Column({
    type: 'enum',
    enum: TipoAtivo,
    default: TipoAtivo.ATIVO,
  })
  status_uso: TipoAtivo;

  @Column()
  foto: string;
}
