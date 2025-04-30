import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';
import { Solicitacao } from 'src/solicitacoes/solicitaçoes.entity';

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

  @Column({
    type: 'enum',
    enum: TipoPermissao,
    default: TipoPermissao.COLABORADOR,
  })
  permissao: TipoPermissao;

  @OneToMany(() => Solicitacao, solicitacao => solicitacao.colaborador)
  solicitacoes: Solicitacao[];
}
