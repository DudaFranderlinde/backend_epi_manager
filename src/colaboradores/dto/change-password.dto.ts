import { IsNotEmpty, IsString } from 'class-validator';

export class checkPassDTO {
  @IsNotEmpty()
  @IsString()
  matricula: string;

  @IsNotEmpty()
  @IsString()
  novaSenha: string;
}
