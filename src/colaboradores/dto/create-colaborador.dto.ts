import { IsString, IsBoolean, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';

export class CreateColaboradorDto {
  @IsString({message: "O campo matricula deve ser uma string"})
  @IsNotEmpty({message: "O campo matricula não pode ser vazio"})
  matricula: string;

  @IsString({message: "O campo matricula deve ser uma string"})
  @IsNotEmpty({message: "O campo matricula não pode ser vazio"})
  nome: string;

  @IsString({message: "O campo matricula deve ser uma string"})
  @IsNotEmpty({message: "O campo matricula não pode ser vazio"})
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'CPF deve estar no formato 000.000.000-00',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  setor: string;

  @IsBoolean()
  @IsNotEmpty()
  lideranca: boolean;

  @IsString()
  @IsNotEmpty()
  nome_lideranca: string;

  @IsEnum(TipoPermissao)
  @IsNotEmpty()
  permissao: TipoPermissao;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
