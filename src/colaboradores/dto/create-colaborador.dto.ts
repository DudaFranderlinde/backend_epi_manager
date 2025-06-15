import { IsString, IsBoolean, IsEnum, IsNotEmpty, Matches, MinLength, IsEmail, IsOptional } from 'class-validator';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';

export class CreateColaboradorDto {
  @IsString({message: "O campo matricula deve ser uma string"})
  @IsNotEmpty({message: "O campo matricula não pode ser vazio"})
  matricula: string;

  @IsString({message: "O campo nome deve ser uma string"})
  @IsNotEmpty({message: "O campo nome não pode ser vazio"})
  nome: string;

  @IsString({message: "O campo email deve ser uma string"})
  @IsNotEmpty({message: "O campo email não pode ser vazio"})
  @IsEmail()
  email: string;

  @IsString({message: "O campo CPF deve ser uma string"})
  @IsNotEmpty({message: "O campo CPF não pode ser vazio"})
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
  @IsOptional()
  nome_lideranca?: string;

  @IsEnum(TipoPermissao)
  @IsNotEmpty()
  permissao: TipoPermissao;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  senha: string;
}
