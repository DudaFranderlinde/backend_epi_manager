import {
    Controller,
    Post,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
    Get,
    Request,
    Patch,
    Param,
    ParseIntPipe,
    Delete
  } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';
import { JwtAuthGuard } from 'src/core/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/core/roles/roles.guard';
import { Roles } from 'src/core/roles/roles.decorator';
import { ColaboradorEntity } from './colaborador.entity';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
  
  @Controller('colaboradores')
  export class ColaboradorController {
    constructor(private readonly colaboradorService: ColaboradorService) {}
  
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(TipoPermissao.ADMIN)
    @Post('create')
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

    @Get('find-all')
    async findAll(): Promise<ColaboradorEntity[]> {
      try {
        const availableColaborador = await this.colaboradorService.findAll();
        return availableColaborador;
      } catch (error) {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      }
    }

    @Get('find-lead')
    async findLead(): Promise<ColaboradorEntity[]> {
      try {
        const availableColaborador = await this.colaboradorService.findLead();
        return availableColaborador;
      } catch (error) {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get('find-me')
    async findMe(@Request() req): Promise<ColaboradorEntity> {
      try {
        const availableColaborador = await this.colaboradorService.findColaboradorById(req.user.id);
        console.log(availableColaborador);
        
        return availableColaborador;
      } catch (error) {
          throw new HttpException(
            {
              message: error.message || 'Erro inesperado',
              stack: error.stack,
            },
            HttpStatus.BAD_REQUEST,
          );
      }
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateColaboradorDto) {
    return this.colaboradorService.updateColaborador(id, data);
    }

    @Patch(':id/status')
    // @Roles(TipoPermissao.ADMIN)
    async alterarStatusUso(
      @Param('id') id: number,
    ) {
      return this.colaboradorService.alterarStatusUso(id);
    }
  }
  