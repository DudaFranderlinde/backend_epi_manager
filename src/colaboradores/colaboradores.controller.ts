import { Body, Controller, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('colaborador')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  @Post('findByMatricula')
  async findByMatricula(@Body('matricula') matricula: string) {
    if (!(await this.colaboradoresService.findByMatricula(matricula))) {
      throw new NotFoundException(
        'Não existe nenhum colaborador com esta matrícula!',
      );
    }
    return this.colaboradoresService.findByMatricula(matricula);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/changePassword')
  async changePassword(@Request() request, @Body() body: ChangePasswordDTO) {
    try {
      const authorization = request.headers.authorization;
      const token = authorization.split('Bearer ');
      const payload = this.jwtService.decode(token[1]);
      await this.userService.changePassword(payload, body);
      return {
        message: 'Senha alterada com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        { reason: 'Alguma informação está incorreta, verifique novamente!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
