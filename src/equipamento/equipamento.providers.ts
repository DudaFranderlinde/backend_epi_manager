import { DataSource } from "typeorm";
import { EquipamentoEntity } from "./equipamento.entity";

export const equipamentosProviders = [
  {
    provide: 'EQUIPAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EquipamentoEntity),
    inject: ['DATA_SOURCE'],
  }
];