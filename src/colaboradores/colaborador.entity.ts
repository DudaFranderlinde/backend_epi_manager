import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';
import { SolicitacaoEntity } from 'src/solicitacoes/solicitaçoes.entity';

@Entity()
export class ColaboradorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  matricula: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  cargo: string;

  @Column()
  setor: string;

  @Column({ default: false })
  lideranca: boolean;

  @Column()
  nome_lideranca: string;

  @Column()
  senha: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: TipoPermissao,
    default: TipoPermissao.COLABORADOR,
  })
  permissao: TipoPermissao;

  @OneToMany(() => SolicitacaoEntity, solicitacao => solicitacao.solicitante)
  solicitacoes: SolicitacaoEntity[];
}
