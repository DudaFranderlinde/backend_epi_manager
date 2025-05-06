import { Inject, Injectable } from "@nestjs/common";
import { CreateColaboradorDto } from "./dto/create-colaborador.dto";
import { ColaboradorEntity } from "./colaborador.entity";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


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

    async create(dto: CreateColaboradorDto): Promise<ColaboradorEntity> {
        return new Promise(async (resolve, reject) => {
            try {
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
                
                const createdColaborador = this.colaboradorRepository.save(createColaborador);

                delete (await createdColaborador).senha;
                delete (await createdColaborador).salt;

                resolve(createdColaborador);

            } catch (error) {
                return reject({
                    code: error.code,
                    detail: error.detail,
                });
            }
        })
}

}