import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateColaboradorDto } from "./dto/create-colaborador.dto";
import { ColaboradorEntity } from "./colaborador.entity";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UpdateColaboradorDto } from "./dto/update-colaborador.dto";
import { TipoAtivo } from "src/enums/tipo-ativo.enum";
import { checkPassDTO } from "./dto/change-password.dto";


@Injectable()
export class ColaboradorService {
    constructor(
        private jwtService: JwtService,
        @Inject('COLABORADOR_REPOSITORY')
        private colaboradorRepository: Repository<ColaboradorEntity>
    ){}

    async findColaborador(cpf: string): Promise<ColaboradorEntity>{
        const existingColaborador = this.colaboradorRepository.findOne({
            where: {cpf}
        })
        return existingColaborador
    }

    async findColaboradorById(id: number): Promise<ColaboradorEntity>{
        console.log(id);
        
        const existingColaborador = this.colaboradorRepository.findOne({
            where: {id: id}
        })
        return existingColaborador
    }

    async findColaboradoByMatricula(matricula: string): Promise<ColaboradorEntity>{
        const existingColaborador = this.colaboradorRepository.findOne({
            where: {matricula: matricula}
        })
        return existingColaborador
    }

    async findLead(): Promise<ColaboradorEntity[]>{
        const existingColaborador = this.colaboradorRepository.find({
            where: {
                lideranca: true
            }
        })
        return existingColaborador
    }

    async create(dto: CreateColaboradorDto): Promise<ColaboradorEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("entrou");
                
                const {senha} = dto;
                const findColaborador = await this.findColaborador(dto.cpf);
                
                if (findColaborador) {
                    reject('Já existe um registro com esse CPF');
                  }

                const createColaborador = this.colaboradorRepository.create({
                    ...dto,
                });
                createColaborador.salt = await bcrypt.genSalt();
                createColaborador.senha =  await bcrypt.hash(senha, createColaborador.salt);
                
                const createdColaborador = await this.colaboradorRepository.save(createColaborador);

                delete createdColaborador.senha;
                delete createdColaborador.salt;

                resolve(createdColaborador);

            } catch (error) {
                return reject({
                    code: error.code,
                    detail: error.detail,
                });
            }
        })
    }

    async findByMatricula(matricula: string): Promise<ColaboradorEntity> {
        const colaborador = await this.colaboradorRepository.findOne({
          where: { matricula, status_uso: TipoAtivo.ATIVO },
          select: ['id', 'matricula', 'nome', 'senha', 'permissao'],
        });
    
        if (!colaborador) {
          throw new NotFoundException('Colaborador não encontrado');
        }
    
        return colaborador;
      }

    async findAll(): Promise<ColaboradorEntity[]>{
        const allColaborador = this.colaboradorRepository.find();
        (await allColaborador).forEach(element => delete element.senha);
        (await allColaborador).forEach(element => delete element.salt);

        return allColaborador;
    }

    async updateColaborador(id: number, data: UpdateColaboradorDto): Promise<ColaboradorEntity> {
        const colaborador = await this.colaboradorRepository.findOne({ where: { id } });
        if (!colaborador) throw new NotFoundException('Colaborador não encontrado');

        if (data.cargo !== undefined) colaborador.cargo = data.cargo;
        if (data.setor !== undefined) colaborador.setor = data.setor;
        if (data.lideranca !== undefined) colaborador.lideranca = data.lideranca;
        if (data.nome_lideranca !== undefined) colaborador.nome_lideranca = data.nome_lideranca;
        if (data.permissao !== undefined) colaborador.permissao = data.permissao;
        if (data.senha !== undefined) {
            const salt = await bcrypt.genSalt();
            colaborador.salt = salt;
            colaborador.senha = await bcrypt.hash(data.senha, salt);
        }

        return this.colaboradorRepository.save(colaborador);
    }

    async alterarStatusUso(id: number): Promise<{ message: string }> {
        const colaborador = await this.colaboradorRepository.findOne({ where: { id } });
        let alteração;

        if (!colaborador) {
            throw new NotFoundException('Colaborador não encontrado');
        }

        if (colaborador.status_uso == TipoAtivo.ATIVO){
            colaborador.status_uso = TipoAtivo.DESATIVADO
            alteração = "desativado";
        } else {
            colaborador.status_uso = TipoAtivo.ATIVO
            alteração = "reativado"
        }
            
       
        await this.colaboradorRepository.save(colaborador);

        return { message: `Colaborador ${alteração} com sucesso` };
    }

    async changePassword(forgotPasswordDto: checkPassDTO): Promise<{ message: string }> {
        const colaborador = await this.colaboradorRepository.findOne({
            where: { matricula: forgotPasswordDto.matricula },
        });

        if (!colaborador) {
            throw new NotFoundException('Colaborador não encontrado com essa matrícula');
        }

        const salt = await bcrypt.genSalt();
        colaborador.salt = salt;
        colaborador.senha = await bcrypt.hash(forgotPasswordDto.novaSenha, salt);


        await this.colaboradorRepository.save(colaborador);

        return { message: 'Senha atualizada com sucesso' };
    }
}