import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { TipoPermissao } from 'src/enums/tipo-permissao.enum';

export class UpdateColaboradorDto {
  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  setor?: string;

  @IsOptional()
  @IsBoolean()
  lideranca?: boolean;

  @IsOptional()
  @IsString()
  nome_lideranca?: string;

  @IsOptional()
  @IsEnum(TipoPermissao)
  permissao?: TipoPermissao;

  @IsOptional()
  @IsString()
  senha?: string;
}
