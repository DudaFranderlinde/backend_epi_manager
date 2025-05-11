import { IsNotEmpty, IsUUID, IsNumber, IsEnum, IsString } from 'class-validator';
import { Urgencia } from 'src/enums/urgencia.enum';

export class CreateSolicitacaoDto {
  @IsNotEmpty()
  @IsNumber()
  equipamentoId: number;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @IsEnum(Urgencia)
  @IsNotEmpty()
  urgencia: Urgencia;
  
  @IsString()
  @IsNotEmpty()
  responsavel: string;
  
  @IsString()
  @IsNotEmpty()
  matricula_responsavel: string;
}
