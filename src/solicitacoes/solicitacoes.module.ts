import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { SolicitacaoController } from './solicitacoes.controller';
import { solicitacoesProviders } from './solicitacoes.providers';
import { SolicitacaoService } from './solicitacoes.service';
import { EquipamentoService } from 'src/equipamento/equipamento.service';
import { ColaboradorService } from 'src/colaboradores/colaborador.service';

@Module({
  controllers: [SolicitacaoController],
  providers: [...solicitacoesProviders, ...databaseProviders, SolicitacaoService, EquipamentoService, ColaboradorService],
})
export class SolicitacoesModule {}