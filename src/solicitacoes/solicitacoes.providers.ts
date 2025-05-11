import { EquipamentoEntity } from "src/equipamento/equipamento.entity";
import { DataSource } from "typeorm";
import { SolicitacaoEntity } from "./solicitaçoes.entity";
import { ColaboradorEntity } from "src/colaboradores/colaborador.entity";

export const solicitacoesProviders = [
    {
        provide: 'SOLICITACAO_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(SolicitacaoEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'EQUIPAMENTO_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(EquipamentoEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'COLABORADOR_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ColaboradorEntity),
        inject: ['DATA_SOURCE'],
    }
];