import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ColaboradorEntity } from "src/colaboradores/colaborador.entity";
import { ColaboradorService } from "src/colaboradores/colaborador.service";
import * as bcrypt from 'bcrypt';
import { CredentialsDTO } from "../dto/credentials.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly colaboradorService: ColaboradorService,
        private jwtService: JwtService,
    ){}

    async validateUser(matricula: string, senha: string): Promise<ColaboradorEntity> {
        const user = await this.colaboradorService.findByMatricula(matricula);
        
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
          throw new UnauthorizedException( {message:'Matrícula ou senha inválidos.'});
        }
        return user;
    }

    async login(user: CredentialsDTO) {
        return new Promise(async (resolve, reject) => {
            try {
                const colaborador = await this.validateUser(user.matricula, user.password);
                if (colaborador === null) {                    
                    reject('Matrícula e/ou senha incorretos! Não foi possível realizar o login');
                }
        
                const payload = { id: colaborador.id, nome: colaborador.nome, permissao: colaborador.permissao };
                const token = this.jwtService.sign(payload);
                
                return resolve({
                    token: token,
                    permissao: colaborador.permissao
                }) ;
            } catch (error) {
                return reject({
                    code: error.code,
                    detail: error.detail,
                });
            }

        })
      }
    
    validateToken(jwtToken: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.jwtService.verifyAsync(jwtToken, {
                    ignoreExpiration: false
                }))                
            } catch (error) {
                reject({
                    code: 401,
                    detail: 'JWT expired.'
                })
            }
        })
    }

    decodedToken(jwtToken: string) {
        return this.jwtService.decode(jwtToken);
    }
}