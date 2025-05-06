import { Module } from '@nestjs/common';
import { colaboradorProviders } from './colaborador.providers';
import { databaseProviders } from 'src/core/database/database.providers';
import { ColaboradorController } from './colaboradores.controller';
import { ColaboradorService } from './colaborador.service';

@Module({
  controllers: [ColaboradorController],
  providers: [...colaboradorProviders, ...databaseProviders, ColaboradorService],
})
export class ColaboradoresModule {}