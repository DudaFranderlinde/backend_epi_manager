import { Module } from '@nestjs/common';
import { equipamentosProviders } from './equipamento.providers';
import { databaseProviders } from 'src/core/database/database.providers';
import { EquipamentoService } from './equipamento.service';
import { EquipamentoController } from './equipamento.controller';

@Module({
  controllers: [EquipamentoController],
  providers: [...databaseProviders, ...equipamentosProviders, EquipamentoService],
})
export class EquipamentoModule {}