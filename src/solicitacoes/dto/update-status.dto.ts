import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusSolicitacao } from 'src/enums/status-solicitacao.enum';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(StatusSolicitacao)
  status: StatusSolicitacao;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
