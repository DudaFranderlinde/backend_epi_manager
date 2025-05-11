import { Module } from '@nestjs/common';
import { colaboradorProviders } from './colaborador.providers';
import { databaseProviders } from 'src/core/database/database.providers';
import { ColaboradorController } from './colaboradores.controller';
import { ColaboradorService } from './colaborador.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ColaboradorController],
  providers: [...colaboradorProviders, ...databaseProviders, ColaboradorService, JwtService],
})
export class ColaboradoresModule {}