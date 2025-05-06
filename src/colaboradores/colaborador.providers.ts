import { DataSource } from 'typeorm';
import { ColaboradorEntity } from './colaborador.entity';
import { SolicitacaoEntity } from 'src/solicitacoes/solicitaçoes.entity';

export const colaboradorProviders = [
  {
    provide: 'COLABORADOR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ColaboradorEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SOLICITACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SolicitacaoEntity),
    inject: ['DATA_SOURCE'],
  },
];