import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColaboradorEntity } from './colaborador.entity';
import { AuthService } from 'src/core/auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ColaboradoresService {
  constructor(
    @Inject('COLABORADORES_REPOSITORY')
    private colaboradorRepository: Repository<ColaboradorEntity>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async findByMatricula(matricula: string) {
    const userExists = await this.colaboradorRepository.findOne({
      where: {
        matricula: matricula,
      },
    });
    return userExists;
  }
}
