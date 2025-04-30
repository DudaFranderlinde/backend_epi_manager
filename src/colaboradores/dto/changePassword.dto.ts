import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsString({ message: 'O email deve ser uma string!' })
  @IsEmail(undefined, { message: 'O e-mail informado não é válido!' })
  readonly email: string;

  @IsNotEmpty({ message: 'A senha antiga é um campo obrigatório!' })
  @IsString({ message: 'A senha antiga deve ser uma string!' })
  @MinLength(8, { message: 'A senha antiga deve ter no mínimo 8 caracteres!' })
  readonly oldPassword: string;

  @IsNotEmpty({ message: 'A senha nova é um campo obrigatório!' })
  @IsString({ message: 'A senha nova deve ser uma string!' })
  @MinLength(8, { message: 'A senha nova deve ter no mínimo 8 caracteres!' })
  readonly newPassword: string;

  @IsNotEmpty({
    message: 'A confirmação da senha nova é um campo obrigatório!',
  })
  @IsString({ message: 'A confirmação da senha nova deve ser uma string!' })
  @MinLength(8, {
    message: 'A confirmação da senha nova deve ter no mínimo 8 caracteres!',
  })
  @Match('newPassword', {
    message: 'As suas novas senhas não estão iguais, revise-as!',
  })
  readonly confirmNewPassword: string;
}
