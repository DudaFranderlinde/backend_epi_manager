import {
    Controller,
    Post,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';
import { JwtAuthGuard } from 'src/core/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/core/roles/roles.guard';
import { Roles } from 'src/core/roles/roles.decorator';
  
  @Controller('colaboradores')
  export class ColaboradorController {
    constructor(private readonly colaboradorService: ColaboradorService) {}
  
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(TipoPermissao.ADMIN)
    @Post()
    async create(@Body() dto: CreateColaboradorDto) {
        try {
            const colaborador = await this.colaboradorService.create(dto);
            return {
              message: 'Colaborador criado com sucesso',
              colaborador: {
                id: colaborador.id,
                nome: colaborador.nome,
                matricula: colaborador.matricula,
                permissao: colaborador.permissao,
              },
            };
        } catch (error) {
            if (error.code == 23505)
                throw new HttpException(
                  { message: error.detail, errorCode: HttpStatus.CONFLICT },
                  HttpStatus.CONFLICT,
                );
        
              throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
        }
    }
  }
  