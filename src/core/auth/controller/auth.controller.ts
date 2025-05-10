import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { CredentialsDTO } from "../dto/credentials.dto";
import { ColaboradorService } from "src/colaboradores/colaborador.service";
import { AuthService } from "../service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly colaboradorService: ColaboradorService,
        private readonly authService: AuthService,
    ){}

    @Post('/login')
    async signIn(@Body() loginCompanyDTO: CredentialsDTO){
        try {
            if (!(await this.colaboradorService.findByMatricula(loginCompanyDTO.matricula))) {
                throw new UnauthorizedException(
                  'Esta matrícula não consta no nosso banco de dados!',
                );
              }
              return await this.authService.login(loginCompanyDTO)
              
            
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